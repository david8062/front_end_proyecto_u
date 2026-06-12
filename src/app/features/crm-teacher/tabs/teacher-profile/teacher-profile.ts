import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  Profile,
  Education,
  DegreeLevel,
  DEGREE_LABELS,
} from '../../../../core/models/profile.model';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teacher-profile.html',
  styleUrl: './teacher-profile.scss',
})
export class TeacherProfile implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);

  profile = signal<Profile | null>(null);
  loading = signal(true);
  saving = signal(false);
  hasProfile = signal(false);

  form = {
    description: '',
    experience: '',
    specialization: '',
    web_site: '',
    social_networks: '',
  };

  showAddEducation = signal(false);
  addingEducation = signal(false);
  newEducation = {
    degree: 'PREGRADO' as DegreeLevel,
    institution: '',
    field: '',
    start_year: new Date().getFullYear(),
    end_year: undefined as number | undefined,
    is_current: false,
  };

  readonly degreeOptions = Object.entries(DEGREE_LABELS) as [DegreeLevel, string][];

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) { this.loading.set(false); return; }

    this.profileService.getMyProfile(userId).subscribe({
      next: (res) => {
        this.profile.set(res.data);
        this.hasProfile.set(true);
        this.patchForm(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.hasProfile.set(false);
        this.loading.set(false);
      },
    });
  }

  createProfile() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;
    this.saving.set(true);
    this.profileService.createProfile({ user_id: userId, ...this.form }).subscribe({
      next: (res) => {
        this.profile.set(res.data);
        this.hasProfile.set(true);
        this.saving.set(false);
      },
      error: () => this.saving.set(false),
    });
  }

  saveProfile() {
    const p = this.profile();
    if (!p) { this.createProfile(); return; }
    this.saving.set(true);
    this.profileService.updateProfile(p.UniqueID, this.form).subscribe({
      next: (res) => {
        this.profile.set(res.data);
        this.saving.set(false);
      },
      error: () => this.saving.set(false),
    });
  }

  addEducation() {
    const p = this.profile();
    if (!p) return;
    this.addingEducation.set(true);
    const payload = {
      ...this.newEducation,
      end_year: this.newEducation.is_current ? undefined : this.newEducation.end_year,
      profile_id: p.UniqueID,
    };
    this.profileService.addEducation(payload).subscribe({
      next: (res) => {
        const updated = { ...p, education: [...(p.education ?? []), res.data] };
        this.profile.set(updated);
        this.showAddEducation.set(false);
        this.resetNewEducation();
        this.addingEducation.set(false);
      },
      error: () => this.addingEducation.set(false),
    });
  }

  deleteEducation(id: string) {
    const p = this.profile();
    if (!p) return;
    this.profileService.deleteEducation(id).subscribe({
      next: () => {
        const updated = { ...p, education: p.education?.filter((e) => e.uniqueID !== id) };
        this.profile.set(updated);
      },
    });
  }

  private patchForm(p: Profile) {
    this.form.description = p.description ?? '';
    this.form.experience = p.experience ?? '';
    this.form.specialization = p.specialization ?? '';
    this.form.web_site = p.web_site ?? '';
    this.form.social_networks = p.social_networks ?? '';
  }

  private resetNewEducation() {
    this.newEducation = {
      degree: 'PREGRADO',
      institution: '',
      field: '',
      start_year: new Date().getFullYear(),
      end_year: undefined,
      is_current: false,
    };
  }
}
