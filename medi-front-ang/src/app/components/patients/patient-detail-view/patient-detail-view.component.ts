import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserNameIcon } from 'src/app/helpers/assets-helper';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-detail-view',
  templateUrl: './patient-detail-view.component.html',
  styleUrls: ['./patient-detail-view.component.less']
})
export class PatientDetailViewComponent implements OnInit {

  patientData: any = null;
  femaleIcon = UserNameIcon;
  maleIcon = UserNameIcon;
  isAdmin= false;
  isDoctor = false;
  isFamiliar = false;
  isNurse = false;

  showSigns = false;
  addUserToPatient = false;
  typeUserChoose = '';
  showUpdateFieldText = false;

  selectedField ='';
  lastSelectedValue = '';

  constructor(private route: ActivatedRoute, 
    private _authService: AuthServiceService,
    private _patientService: PatientServiceService){

  }

  ngOnInit(): void {
    const patientData: any = JSON.parse(
      JSON.stringify(this.route.snapshot.data['patientData'].data.data)
    );

    this.patientData = patientData;
    this.isAdmin = this._authService.isAdmin();
    this.isDoctor = this._authService.isDoctor();
    this.isNurse = this._authService.isNurse();
    this.isFamiliar = this._authService.isFamiliar();
  }

  reloadPatient(){
    this._patientService.getPatitentById(this.patientData._id).subscribe((data)=>{
      this.patientData = data.data;
    }, (erro)=>{
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${erro.error.error}</strong>`,
      });
    })
  }

  formatedBirthDate(date: string){
    return date.split('T')[0]
  }

  ImageProfile(gender:string){
    return gender == 'mujer' ? this.femaleIcon : this.maleIcon;
  }

  get fullName(){
    return `${this.patientData?.name} ${this.patientData?.lastname}`
  }

  get hasDoctor(){
    return this.patientData && this.patientData.doctorAttendence
  }
  get hasNurses(){
    return this.patientData 
    && this.patientData.nursesAtendence 
    && this.patientData.nursesAtendence.length > 0 
  }

  get hasNursesCompleted(){
    return this.patientData 
    && this.patientData.nursesAtendence 
    && this.patientData.nursesAtendence.length > 1 
  }

  get hasFamiliar(){
    return this.patientData 
    && this.patientData.familiar 
  }

  get currentNurses(){
    return this.hasNurses ? this.patientData.nursesAtendence : []
  }
  get hasRadios(){
    return this.patientData 
    && this.patientData.radiographies
    && this.patientData.radiographies.length > 0 
  }
  get patientRadios(){
    return this.patientData.radiographies ? this.patientData.radiographies : []
  }

  get hasMedicines(){
    return this.patientData && this.patientData.medicines
  }

  get hasRecommend(){
    return this.patientData && this.patientData.recomendations
  }

  get hasNotes(){
    return this.patientData && this.patientData.nurseNotes
  }

  openSigns(){
    this.showSigns = true;
  }

  closeSigns(event: any){
    this.showSigns = false;
  }

  openUserChoose(type: string){
    this.typeUserChoose = type;
    this.addUserToPatient = true;
  }

  closeUserChoose(event: any){
    this.addUserToPatient = false;
    this.reloadPatient();
  }

  closeUpdateModal(event: any){
    this.showUpdateFieldText = false;
    this.reloadPatient();
  }

  updateField(filed: string){
    this.selectedField = filed;
    this.lastSelectedValue = filed in this.patientData ? this.patientData[filed] :'';
    this.showUpdateFieldText = true
  }

}
