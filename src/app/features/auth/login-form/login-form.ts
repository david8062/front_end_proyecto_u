import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RolesService } from '../../../core/services/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
})
export class LoginForm {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rolesService: RolesService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.redirectByRole();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Credenciales incorrectas';
        this.loading = false;
      },
    });
  }

  private redirectByRole() {
    const roleId = this.authService.getCurrentRoleId();
    if (!roleId) {
      this.router.navigate(['/']);
      return;
    }

    this.rolesService.getRoles().subscribe({
      next: (res) => {
        const role = res.data.find((r) => r.uniqueID === roleId);
        this.loading = false;
        if (role?.name_rol === 'Profesor') {
          this.router.navigate(['/crm/teacher']);
        } else {
          this.router.navigate(['/crm/student']);
        }
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
    });
  }
}
