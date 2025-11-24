import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStats } from './teacher-stats';

describe('TeacherStats', () => {
  let component: TeacherStats;
  let fixture: ComponentFixture<TeacherStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
