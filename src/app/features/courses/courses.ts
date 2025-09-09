import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.model';
import { ApiResponse } from '../../core/models/ApiResponse.model';
import { Course } from '../../core/models/courses.model';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule], 
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class Courses {
  categories$!: Observable<ApiResponse<Category[]>>;
  courses$!: Observable<ApiResponse<Course[]>>;

  constructor(private categoriesService: CategoriesService, private courseService: CourseService ) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
    this.courses$ = this.courseService.getCourses();
  }
}
