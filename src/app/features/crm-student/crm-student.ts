import { Component, signal } from '@angular/core';
import { StudentSearch } from './tabs/student-search/student-search';
import { StudentSessions } from './tabs/student-sessions/student-sessions';

type Tab = 'search' | 'sessions';

@Component({
  selector: 'app-crm-student',
  standalone: true,
  imports: [StudentSearch, StudentSessions],
  templateUrl: './crm-student.html',
  styleUrl: './crm-student.scss',
})
export class CrmStudent {
  activeTab = signal<Tab>('search');
}
