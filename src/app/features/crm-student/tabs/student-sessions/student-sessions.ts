import { Component, inject, signal, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/session.service';
import {
  Session,
  SessionStatus,
  SESSION_STATUS_LABELS,
  SERVICE_TYPE_LABELS,
  ServiceType,
} from '../../../../core/models/profile.model';

@Component({
  selector: 'app-student-sessions',
  standalone: true,
  imports: [],
  templateUrl: './student-sessions.html',
  styleUrl: './student-sessions.scss',
})
export class StudentSessions implements OnInit {
  private sessionService = inject(SessionService);

  sessions = signal<Session[]>([]);
  loading = signal(true);
  cancelling = signal<string | null>(null);

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.loading.set(true);
    this.sessionService.getMySessions().subscribe({
      next: (res) => {
        this.sessions.set(res.data ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  cancel(sessionId: string) {
    this.cancelling.set(sessionId);
    this.sessionService.cancel(sessionId).subscribe({
      next: (res) => {
        this.sessions.update((list) =>
          list.map((s) => (s.uniqueID === sessionId ? res.data : s)),
        );
        this.cancelling.set(null);
      },
      error: () => this.cancelling.set(null),
    });
  }

  getStatusLabel(status: SessionStatus): string {
    return SESSION_STATUS_LABELS[status] ?? status;
  }

  getServiceLabel(type: ServiceType): string {
    return SERVICE_TYPE_LABELS[type] ?? type;
  }

  formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  }

  canCancel(session: Session): boolean {
    return session.status === 'PENDING' || session.status === 'CONFIRMED';
  }

  get upcoming(): Session[] {
    const today = new Date().toISOString().split('T')[0];
    return this.sessions().filter(
      (s) => s.scheduled_date >= today && s.status !== 'CANCELLED',
    );
  }

  get past(): Session[] {
    const today = new Date().toISOString().split('T')[0];
    return this.sessions().filter(
      (s) => s.scheduled_date < today || s.status === 'CANCELLED' || s.status === 'COMPLETED',
    );
  }
}
