import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUserListModalComponent } from './patient-user-list-modal.component';

describe('PatientUserListModalComponent', () => {
  let component: PatientUserListModalComponent;
  let fixture: ComponentFixture<PatientUserListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUserListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientUserListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
