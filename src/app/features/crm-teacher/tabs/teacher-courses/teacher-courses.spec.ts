import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourses } from './teacher-courses';

describe('TeacherCourses', () => {
  let component: TeacherCourses;
  let fixture: ComponentFixture<TeacherCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
