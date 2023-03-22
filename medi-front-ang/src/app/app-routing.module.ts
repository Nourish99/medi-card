import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientFormComponent } from './components/patients/patient-form/patient-form.component';
import { PatientDetailViewComponent } from './components/patients/patient-detail-view/patient-detail-view.component';
import { PatientDetailResolver } from './components/resolvers/patient-detail.resolver';

const routes: Routes = [
  {path: '', component: LandingComponent}, 
  {path: 'login', component: AuthComponent},
  {
    path: 'dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard]
  },
  {
    path:'patients',
    component: PatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'patient-form',
    component: PatientFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'patients/:id',
    component: PatientDetailViewComponent,
    canActivate: [AuthGuard],
    resolve:{
      patientData: PatientDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
