import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';
import { LoginForm } from './features/auth/login-form/login-form';
import { RegisterForm } from './features/auth/register-form/register-form';
import { Home } from './features/home/home';
import { Courses } from './features/courses/courses';
import { CrmTeacher } from './features/crm-teacher/crm-teacher';
import { CrmStudent } from './features/crm-student/crm-student';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterForm },
      { path: '', redirectTo: 'login', pathMatch: 'full' }

    ]
  },
  {
    path: 'courses',
    component: Courses,
    children: [
      {
        path: 'courses', component: Courses
      }
    ]
  },
 {
  path: 'crm',
  children: [
    { path: 'teacher', component: CrmTeacher },
    { path: 'student', component: CrmStudent }
  ]
},
  { path: '**', redirectTo: '' } 
];
