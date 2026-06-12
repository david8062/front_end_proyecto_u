import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { SessionService, CreateSessionPayload } from '../../../../core/services/session.service';
import { ProfileService } from '../../../../core/services/profile.service';
import {
  Profile,
  TimeSlot,
  ServiceType,
  SERVICE_TYPE_LABELS,
  DEGREE_LABELS,
} from '../../../../core/models/profile.model';
import { ApiResponse } from '../../../../core/models/ApiResponse.model';

interface Category {
  uniqueID: string;
  name: string;
}

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './student-search.html',
  styleUrl: './student-search.scss',
})
export class StudentSearch implements OnInit {
  private sessionService = inject(SessionService);

  advisors = signal<Profile[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);

  selectedCategory = signal('');
  searchText = signal('');

  // Booking modal state
  selectedAdvisor = signal<Profile | null>(null);
  bookingDate = signal('');
  slots = signal<TimeSlot[]>([]);
  loadingSlots = signal(false);
  selectedSlot = signal<TimeSlot | null>(null);
  selectedServiceType = signal<ServiceType>('CLASE_PERSONALIZADA');
  bookingNotes = signal('');
  booking = signal(false);
  bookingSuccess = signal(false);
  bookingError = signal('');

  readonly serviceOptions = Object.entries(SERVICE_TYPE_LABELS) as [ServiceType, string][];
  readonly degreeLabels = DEGREE_LABELS;
  readonly minDate = new Date().toISOString().split('T')[0];

  ngOnInit() {
    this.loadAdvisors();
  }

  loadAdvisors() {
    this.loading.set(true);
    const cat = this.selectedCategory();
    this.sessionService.getAdvisors(cat || undefined).subscribe({
      next: (res) => {
        this.advisors.set(res.data ?? []);
        this.extractCategories(res.data ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private extractCategories(profiles: Profile[]) {
    const map = new Map<string, string>();
    for (const p of profiles) {
      for (const s of p.subjects ?? []) {
        if (s.category) map.set(s.category.uniqueID, s.category.name);
      }
    }
    this.categories.set(Array.from(map.entries()).map(([uniqueID, name]) => ({ uniqueID, name })));
  }

  get filteredAdvisors(): Profile[] {
    const text = this.searchText().toLowerCase().trim();
    if (!text) return this.advisors();
    return this.advisors().filter(
      (a) =>
        a.specialization?.toLowerCase().includes(text) ||
        a.user?.primer_nombre?.toLowerCase().includes(text) ||
        a.user?.primer_apellido?.toLowerCase().includes(text) ||
        a.subjects?.some((s) => s.category?.name.toLowerCase().includes(text)),
    );
  }

  onCategoryChange() {
    this.loadAdvisors();
  }

  openBooking(advisor: Profile) {
    this.selectedAdvisor.set(advisor);
    this.bookingDate.set('');
    this.slots.set([]);
    this.selectedSlot.set(null);
    this.bookingNotes.set('');
    this.bookingSuccess.set(false);
    this.bookingError.set('');
    const firstPlan = advisor.pricingPlans?.[0];
    if (firstPlan) this.selectedServiceType.set(firstPlan.service_type);
  }

  closeModal() {
    this.selectedAdvisor.set(null);
  }

  onDateChange() {
    const advisor = this.selectedAdvisor();
    const date = this.bookingDate();
    if (!advisor || !date) return;

    this.loadingSlots.set(true);
    this.selectedSlot.set(null);
    this.sessionService.getSlots(advisor.UniqueID, date).subscribe({
      next: (res) => {
        this.slots.set(res.data ?? []);
        this.loadingSlots.set(false);
      },
      error: () => this.loadingSlots.set(false),
    });
  }

  selectSlot(slot: TimeSlot) {
    if (!slot.available) return;
    this.selectedSlot.set(slot);
  }

  getAvailabilityId(): string {
    const advisor = this.selectedAdvisor();
    if (!advisor) return '';
    const date = this.bookingDate();
    const jsDay = new Date(date + 'T00:00:00').getDay();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = dayNames[jsDay];
    return advisor.availability?.find((a) => a.day_of_week === dayName)?.uniqueID ?? '';
  }

  confirmBooking() {
    const advisor = this.selectedAdvisor();
    const slot = this.selectedSlot();
    if (!advisor || !slot) return;

    const availabilityId = this.getAvailabilityId();
    if (!availabilityId) return;

    this.booking.set(true);
    this.bookingError.set('');

    const payload: CreateSessionPayload = {
      profile_id: advisor.UniqueID,
      availability_id: availabilityId,
      service_type: this.selectedServiceType(),
      scheduled_date: this.bookingDate(),
      start_time: slot.start_time,
      notes: this.bookingNotes() || undefined,
    };

    this.sessionService.book(payload).subscribe({
      next: () => {
        this.booking.set(false);
        this.bookingSuccess.set(true);
        this.slots.update((s) =>
          s.map((sl) =>
            sl.start_time === slot.start_time ? { ...sl, available: false } : sl,
          ),
        );
        this.selectedSlot.set(null);
      },
      error: (err) => {
        this.booking.set(false);
        this.bookingError.set(err?.error?.message ?? 'Error al reservar la sesión');
      },
    });
  }

  getServiceLabel(type: ServiceType): string {
    return SERVICE_TYPE_LABELS[type] ?? type;
  }

  getMinPrice(advisor: Profile): number | null {
    const prices = advisor.pricingPlans?.map((p) => Number(p.price)) ?? [];
    return prices.length ? Math.min(...prices) : null;
  }

  hasPricingPlan(advisor: Profile, serviceType: ServiceType): boolean {
    return advisor.pricingPlans?.some((p) => p.service_type === serviceType) ?? false;
  }

  getPlanPrice(advisor: Profile, serviceType: ServiceType): number {
    return Number(advisor.pricingPlans?.find((p) => p.service_type === serviceType)?.price ?? 0);
  }
}
