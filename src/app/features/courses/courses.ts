import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.model';
import { ApiResponse } from '../../core/models/ApiResponse.model';

@Component({
  selector: 'app-courses',
  imports: [CommonModule], // 👈 para poder usar *ngFor, *ngIf y async pipe
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class Courses {
  categories$!: Observable<ApiResponse<Category[]>>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
  }
}
