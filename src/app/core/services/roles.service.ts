import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { ApiResponse } from '../models/ApiResponse.model';

export interface Role {
  uniqueID: string;
  name_rol: string;
}

@Injectable({ providedIn: 'root' })
export class RolesService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.api}/roles`);
  }
}
