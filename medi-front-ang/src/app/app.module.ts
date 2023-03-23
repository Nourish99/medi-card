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
import { PatientDetailViewComponent } from './components/patients/patient-detail-view/patient-detail-view.component';
import { FamiliarFormComponent } from './components/patients/patient-detail-view/familiar-form/familiar-form.component';
import { PatientUserListModalComponent } from './components/patients/patient-detail-view/patient-user-list-modal/patient-user-list-modal.component';
import { PatientTextModalComponent } from './components/patients/patient-detail-view/patient-text-modal/patient-text-modal.component';
import { PatientImgsModalComponent } from './components/patients/patient-detail-view/patient-imgs-modal/patient-imgs-modal.component';
import { QuillModule } from 'ngx-quill'
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

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
    PatientDetailModalComponent,
    PatientDetailViewComponent,
    FamiliarFormComponent,
    PatientUserListModalComponent,
    PatientTextModalComponent,
    PatientImgsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 60]);
    router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      if (e.anchor) {
        // anchor navigation
        setTimeout(() => {
          viewportScroller.scrollToAnchor(e.anchor);
        })
      } else if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
 }
