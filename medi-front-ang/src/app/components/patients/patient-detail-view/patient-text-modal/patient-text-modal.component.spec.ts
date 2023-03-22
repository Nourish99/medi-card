import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTextModalComponent } from './patient-text-modal.component';

describe('PatientTextModalComponent', () => {
  let component: PatientTextModalComponent;
  let fixture: ComponentFixture<PatientTextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTextModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
