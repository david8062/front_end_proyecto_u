import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ProfileService } from '../../../../core/services/profile.service';
import {
  Availability,
  PricingPlan,
  DayOfWeek,
  ServiceType,
  DAY_LABELS,
  SERVICE_TYPE_LABELS,
} from '../../../../core/models/profile.model';

@Component({
  selector: 'app-teacher-create-course',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './teacher-create-course.html',
  styleUrl: './teacher-create-course.scss',
})
export class TeacherCreateCourse implements OnInit {
  @Input() profileId!: string;

  private profileService = inject(ProfileService);

  availability = signal<Availability[]>([]);
  pricingPlans = signal<PricingPlan[]>([]);
  loading = signal(true);

  showAddAvailability = signal(false);
  addingAvailability = signal(false);
  newAvailability = {
    day_of_week: 'MONDAY' as DayOfWeek,
    start_time: '08:00',
    end_time: '17:00',
    slot_duration_minutes: 60,
    is_active: true,
  };

  showAddPricing = signal(false);
  addingPricing = signal(false);
  newPricing = {
    service_type: 'CLASE_PERSONALIZADA' as ServiceType,
    price: 0,
    description: '',
    is_active: true,
  };

  readonly dayOptions = Object.entries(DAY_LABELS) as [DayOfWeek, string][];
  readonly serviceOptions = Object.entries(SERVICE_TYPE_LABELS) as [ServiceType, string][];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (!this.profileId) { this.loading.set(false); return; }
    this.profileService.getAvailability(this.profileId).subscribe({
      next: (res) => this.availability.set(res.data),
    });
    this.profileService.getPricingPlans(this.profileId).subscribe({
      next: (res) => { this.pricingPlans.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  addAvailability() {
    this.addingAvailability.set(true);
    this.profileService
      .addAvailability({ ...this.newAvailability, profile_id: this.profileId })
      .subscribe({
        next: (res) => {
          this.availability.update((list) => [...list, res.data]);
          this.showAddAvailability.set(false);
          this.resetAvailability();
          this.addingAvailability.set(false);
        },
        error: () => this.addingAvailability.set(false),
      });
  }

  deleteAvailability(id: string) {
    this.profileService.deleteAvailability(id).subscribe({
      next: () => this.availability.update((list) => list.filter((a) => a.uniqueID !== id)),
    });
  }

  addPricingPlan() {
    this.addingPricing.set(true);
    this.profileService
      .addPricingPlan({ ...this.newPricing, profile_id: this.profileId })
      .subscribe({
        next: (res) => {
          this.pricingPlans.update((list) => [...list, res.data]);
          this.showAddPricing.set(false);
          this.resetPricing();
          this.addingPricing.set(false);
        },
        error: () => this.addingPricing.set(false),
      });
  }

  deletePricingPlan(id: string) {
    this.profileService.deletePricingPlan(id).subscribe({
      next: () => this.pricingPlans.update((list) => list.filter((p) => p.uniqueID !== id)),
    });
  }

  getDayLabel(day: DayOfWeek): string { return DAY_LABELS[day]; }
  getServiceLabel(type: ServiceType): string { return SERVICE_TYPE_LABELS[type]; }

  private resetAvailability() {
    this.newAvailability = {
      day_of_week: 'MONDAY',
      start_time: '08:00',
      end_time: '17:00',
      slot_duration_minutes: 60,
      is_active: true,
    };
  }

  private resetPricing() {
    this.newPricing = { service_type: 'CLASE_PERSONALIZADA', price: 0, description: '', is_active: true };
  }
}
