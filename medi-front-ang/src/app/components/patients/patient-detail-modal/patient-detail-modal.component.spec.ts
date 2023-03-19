import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailModalComponent } from './patient-detail-modal.component';

describe('PatientDetailModalComponent', () => {
  let component: PatientDetailModalComponent;
  let fixture: ComponentFixture<PatientDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
