import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  urlComplete = 'api/patient';

  constructor(  private http: HttpServiceService, private _authService: AuthServiceService) { }


  newPatient(patientInfo:any){
    return this.http.postToken(this.urlComplete, '/newPatient', patientInfo,this._authService.getToken());
  }

  editPatient(patientInfo:any){
    return this.http.patch(this.urlComplete, '/editPatient', patientInfo,this._authService.getToken())
  }

  getAllPatients(){
    return this.http.getWithToken( this.urlComplete,  '/getAllPatients', this._authService.getToken())
  }

  getPatitentById(patientId: string){
    return this.http.getWithToken(this.urlComplete,  '/getPatien/'+patientId, this._authService.getToken())
  }

  deletePatient(patientId:string){
    return this.http.delete(this.urlComplete,  '/deletePatient/'+patientId, this._authService.getToken())
  }

  addDoctorToPatient(patientInfo:any){
    return this.http.postToken(this.urlComplete, '/addDoctor', patientInfo,this._authService.getToken());
  }
  
  addNurseToPatient(patientInfo:any){
    return this.http.postToken(this.urlComplete, '/addNurse', patientInfo,this._authService.getToken());
  }
  addRadios(patientInfo: any){
    return this.http.postToken(this.urlComplete, '/addRadios', patientInfo,this._authService.getToken());
  }
}
