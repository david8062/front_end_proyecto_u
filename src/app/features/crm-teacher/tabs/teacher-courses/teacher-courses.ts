import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/services/profile.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';
import {
  TeacherSubject,
  SubjectLevel,
  LEVEL_LABELS,
} from '../../../../core/models/profile.model';

@Component({
  selector: 'app-teacher-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teacher-courses.html',
  styleUrl: './teacher-courses.scss',
})
export class TeacherCourses implements OnInit {
  @Input() profileId!: string;

  private profileService = inject(ProfileService);
  private categoriesService = inject(CategoriesService);

  subjects = signal<TeacherSubject[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  showAddForm = signal(false);
  adding = signal(false);

  newSubject = {
    level: 'BASIC' as SubjectLevel,
    description: '',
    category_id: '',
  };

  readonly levelOptions = Object.entries(LEVEL_LABELS) as [SubjectLevel, string][];

  ngOnInit() {
    this.loadSubjects();
    this.loadCategories();
  }

  loadSubjects() {
    if (!this.profileId) { this.loading.set(false); return; }
    this.profileService.getSubjects(this.profileId).subscribe({
      next: (res) => { this.subjects.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => this.categories.set(res.data),
    });
  }

  addSubject() {
    if (!this.newSubject.category_id) return;
    this.adding.set(true);
    this.profileService
      .addSubject({ ...this.newSubject, profile_id: this.profileId })
      .subscribe({
        next: (res) => {
          this.subjects.update((list) => [...list, res.data]);
          this.showAddForm.set(false);
          this.resetForm();
          this.adding.set(false);
        },
        error: () => this.adding.set(false),
      });
  }

  deleteSubject(id: string) {
    this.profileService.deleteSubject(id).subscribe({
      next: () => this.subjects.update((list) => list.filter((s) => s.uniqueID !== id)),
    });
  }

  getCategoryName(categoryId: string): string {
    return this.categories().find((c) => c.uniqueID === categoryId)?.name ?? categoryId;
  }

  getLevelLabel(level: SubjectLevel): string {
    return LEVEL_LABELS[level];
  }

  private resetForm() {
    this.newSubject = { level: 'BASIC', description: '', category_id: '' };
  }
}
