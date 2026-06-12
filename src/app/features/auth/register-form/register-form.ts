import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { RolesService, Role } from '../../../core/services/roles.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm implements OnInit {
  roles: Role[] = [];
  confirmPassword = '';
  acceptTerms = false;

  user = {
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    password: '',
    roles: '',
  };

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.rolesService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data.filter((r) =>
          ['Estudiante', 'Profesor'].includes(r.name_rol),
        );
      },
    });
  }

  onSubmit() {
    if (this.user.password !== this.confirmPassword) return;

    this.userService.createUser(this.user as any).subscribe({
      next: () => {
        alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Error al registrar usuario');
      },
    });
  }
}
