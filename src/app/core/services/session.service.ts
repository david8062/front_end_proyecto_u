import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { ApiResponse } from '../models/ApiResponse.model';
import { Session, TimeSlot, Profile } from '../models/profile.model';

export interface CreateSessionPayload {
  profile_id: string;
  availability_id: string;
  service_type: string;
  scheduled_date: string;
  start_time: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getAdvisors(categoryId?: string): Observable<ApiResponse<Profile[]>> {
    const url = categoryId
      ? `${this.api}/profiles?category_id=${categoryId}`
      : `${this.api}/profiles`;
    return this.http.get<ApiResponse<Profile[]>>(url);
  }

  getSlots(profileId: string, date: string): Observable<ApiResponse<TimeSlot[]>> {
    return this.http.get<ApiResponse<TimeSlot[]>>(
      `${this.api}/sessions/slots/${profileId}?date=${date}`,
    );
  }

  book(payload: CreateSessionPayload): Observable<ApiResponse<Session>> {
    return this.http.post<ApiResponse<Session>>(`${this.api}/sessions`, payload);
  }

  getMySessions(): Observable<ApiResponse<Session[]>> {
    return this.http.get<ApiResponse<Session[]>>(`${this.api}/sessions/my`);
  }

  cancel(sessionId: string): Observable<ApiResponse<Session>> {
    return this.http.patch<ApiResponse<Session>>(
      `${this.api}/sessions/${sessionId}/cancel`,
      {},
    );
  }
}
