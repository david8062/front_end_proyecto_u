import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { ApiResponse } from '../models/ApiResponse.model';
import {
  Profile,
  Education,
  TeacherSubject,
  PricingPlan,
  Availability,
} from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  // ── Profile ──────────────────────────────────────────────
  getMyProfile(userId: string): Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(`${this.api}/profiles/user/${userId}`);
  }

  createProfile(data: Partial<Profile>): Observable<ApiResponse<Profile>> {
    return this.http.post<ApiResponse<Profile>>(`${this.api}/profiles`, data);
  }

  updateProfile(profileId: string, data: Partial<Profile>): Observable<ApiResponse<Profile>> {
    return this.http.patch<ApiResponse<Profile>>(`${this.api}/profiles/${profileId}`, data);
  }

  // ── Education ────────────────────────────────────────────
  addEducation(data: Omit<Education, 'uniqueID'>): Observable<ApiResponse<Education>> {
    return this.http.post<ApiResponse<Education>>(`${this.api}/education`, data);
  }

  deleteEducation(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.api}/education/${id}`);
  }

  // ── Teacher Subjects ─────────────────────────────────────
  getSubjects(profileId: string): Observable<ApiResponse<TeacherSubject[]>> {
    return this.http.get<ApiResponse<TeacherSubject[]>>(
      `${this.api}/teacher-subjects/profile/${profileId}`,
    );
  }

  addSubject(
    data: Omit<TeacherSubject, 'uniqueID' | 'category'>,
  ): Observable<ApiResponse<TeacherSubject>> {
    return this.http.post<ApiResponse<TeacherSubject>>(`${this.api}/teacher-subjects`, data);
  }

  deleteSubject(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.api}/teacher-subjects/${id}`);
  }

  // ── Pricing Plans ────────────────────────────────────────
  getPricingPlans(profileId: string): Observable<ApiResponse<PricingPlan[]>> {
    return this.http.get<ApiResponse<PricingPlan[]>>(
      `${this.api}/pricing-plans/profile/${profileId}`,
    );
  }

  addPricingPlan(
    data: Omit<PricingPlan, 'uniqueID'>,
  ): Observable<ApiResponse<PricingPlan>> {
    return this.http.post<ApiResponse<PricingPlan>>(`${this.api}/pricing-plans`, data);
  }

  updatePricingPlan(
    id: string,
    data: Partial<PricingPlan>,
  ): Observable<ApiResponse<PricingPlan>> {
    return this.http.patch<ApiResponse<PricingPlan>>(`${this.api}/pricing-plans/${id}`, data);
  }

  deletePricingPlan(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.api}/pricing-plans/${id}`);
  }

  // ── Availability ─────────────────────────────────────────
  getAvailability(profileId: string): Observable<ApiResponse<Availability[]>> {
    return this.http.get<ApiResponse<Availability[]>>(
      `${this.api}/availability/profile/${profileId}`,
    );
  }

  addAvailability(
    data: Omit<Availability, 'uniqueID'>,
  ): Observable<ApiResponse<Availability>> {
    return this.http.post<ApiResponse<Availability>>(`${this.api}/availability`, data);
  }

  deleteAvailability(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.api}/availability/${id}`);
  }
}
