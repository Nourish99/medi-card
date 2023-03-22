import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientImgsModalComponent } from './patient-imgs-modal.component';

describe('PatientImgsModalComponent', () => {
  let component: PatientImgsModalComponent;
  let fixture: ComponentFixture<PatientImgsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientImgsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientImgsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
