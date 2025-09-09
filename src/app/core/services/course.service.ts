import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';
import { Course } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses`);
  }
  
}
