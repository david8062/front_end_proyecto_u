import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateCourse } from './teacher-create-course';

describe('TeacherCreateCourse', () => {
  let component: TeacherCreateCourse;
  let fixture: ComponentFixture<TeacherCreateCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCreateCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCreateCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
