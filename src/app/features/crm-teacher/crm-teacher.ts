import { Component, inject, signal, OnInit } from '@angular/core';
import { TeacherProfile } from './tabs/teacher-profile/teacher-profile';
import { TeacherCourses } from './tabs/teacher-courses/teacher-courses';
import { TeacherCreateCourse } from './tabs/teacher-create-course/teacher-create-course';
import { TeacherStats } from './tabs/teacher-stats/teacher-stats';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-crm-teacher',
  standalone: true,
  imports: [TeacherProfile, TeacherCourses, TeacherCreateCourse, TeacherStats],
  templateUrl: './crm-teacher.html',
  styleUrl: './crm-teacher.scss',
})
export class CrmTeacher implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  activeTab: 'profile' | 'subjects' | 'availability' | 'stats' = 'profile';
  profileId = signal<string | null>(null);

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;
    this.profileService.getMyProfile(userId).subscribe({
      next: (res) => this.profileId.set(res.data.UniqueID),
    });
  }
}
