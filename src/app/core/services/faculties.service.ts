import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';
import { Faculty } from '../models/faculty.model';
@Injectable({
  providedIn: 'root'
})
export class FacultiesService {
  
  private apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  getFaculties(): Observable<ApiResponse<Faculty[]>> {
    return this.http.get<ApiResponse<Faculty[]>>(`${this.apiUrl}/faculties`);
  }
}
