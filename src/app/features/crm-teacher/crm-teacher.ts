import { Component } from '@angular/core';
import { TeacherProfile } from './tabs/teacher-profile/teacher-profile';
import { TeacherCourses } from './tabs/teacher-courses/teacher-courses';
import { TeacherCreateCourse } from './tabs/teacher-create-course/teacher-create-course';
import { TeacherStats } from './tabs/teacher-stats/teacher-stats';

@Component({
  selector: 'app-crm-teacher',
  standalone: true,
  imports: [TeacherProfile, TeacherCourses, TeacherCreateCourse, TeacherStats],
  templateUrl: './crm-teacher.html',
  styleUrl: './crm-teacher.scss'
})
export class CrmTeacher {
  activeTab: 'profile' | 'courses' | 'create' | 'stats' = 'profile';
}
