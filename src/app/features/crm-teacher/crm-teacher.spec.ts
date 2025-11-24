import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTeacher } from './crm-teacher';

describe('CrmTeacher', () => {
  let component: CrmTeacher;
  let fixture: ComponentFixture<CrmTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
