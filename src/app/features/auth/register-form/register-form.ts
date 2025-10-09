import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/ApiResponse.model';
import { Faculty } from '../../../core/models/faculty.model';
import { FacultiesService } from '../../../core/services/faculties.service';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm {

  faculties$!: Observable<ApiResponse<Faculty[]>>;

  user: User = {
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    studentCode: '',
    email: '',
    facultyId: '',
    roles: '',
    passwordResetId: null,
  };

  constructor(private userService: UserService, private facultiesService: FacultiesService) { }

  ngOnInit() {
    this.faculties$ = this.facultiesService.getFaculties();

  }


  onSubmit() {
    this.userService.createUser(this.user).subscribe({
      next: (res) => {
        console.log('Usuario creado:', res);
        alert('Usuario creado con éxito');
        this.resetForm();
      },
      error: (err) => {
        console.error(' Error al crear usuario:', err);
        alert('Error al registrar usuario');
      }
    });
  }

  resetForm() {
    this.user = {
      firstName: '',
      middleName: '',
      lastName: '',
      secondLastName: '',
      studentCode: '',
      email: '',
      facultyId: '',
      roles: '',
      passwordResetId: null,
    };
  }
}
