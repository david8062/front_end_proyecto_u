import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudent } from './crm-student';

describe('CrmStudent', () => {
  let component: CrmStudent;
  let fixture: ComponentFixture<CrmStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
