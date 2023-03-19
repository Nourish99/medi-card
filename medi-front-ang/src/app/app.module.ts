import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PatientsComponent } from './components/patients/patients.component';
import { LandingContactComponent } from './components/landing/landing-contact/landing-contact.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchPatientPipe } from './pipes/search-patient.pipe';
import { PatientFormComponent } from './components/patients/patient-form/patient-form.component';
import { PatientDetailModalComponent } from './components/patients/patient-detail-modal/patient-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthComponent,
    NavbarComponent,
    FooterComponent,
    PatientsComponent,
    LandingContactComponent,
    AdminDashboardComponent,
    SearchPatientPipe,
    PatientFormComponent,
    PatientDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
