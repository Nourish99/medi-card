import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarFormComponent } from './familiar-form.component';

describe('FamiliarFormComponent', () => {
  let component: FamiliarFormComponent;
  let fixture: ComponentFixture<FamiliarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamiliarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
