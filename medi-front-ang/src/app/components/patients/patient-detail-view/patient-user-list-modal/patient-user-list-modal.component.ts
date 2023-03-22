import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserNameIcon } from 'src/app/helpers/assets-helper';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-user-list-modal',
  templateUrl: './patient-user-list-modal.component.html',
  styleUrls: ['./patient-user-list-modal.component.less']
})
export class PatientUserListModalComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<any>();

  @Input() additionType = '';
  @Input() patientId = '';

  listOfUsers = [];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  maleIcon = UserNameIcon;

  constructor(private _userService: UserServiceService, private _patientService: PatientServiceService){

  }


  fullName(name:string, last:string){
    return `${name} ${last}`
  }

  closeMod(){
    this.closeModal.emit(true);
  }

  ngOnDestroy(): void {
      
  }
  ngOnInit(): void {
    if(this.isDoctors){
      this._userService.getAllDoctors().subscribe((data)=>{
        this.listOfUsers = data.data;
      }, (err)=>{
        console.log(err);
      })

    }else{
      this._userService.getAllNurses().subscribe((data)=>{
        this.listOfUsers = data.data;
      }, (err)=>{
        console.log(err);
      })
    }
  }

  get isDoctors(){
    return this.additionType == 'doctor';
  }

  get isNurses(){
    return this.additionType == 'nurse';
  }

  get modalTitle(){
    return this.additionType == 'doctor' ? 'Elegir doctor' : 'Elegir enfermera'
  }
  

  selectUser(user: any){
    console.log(user);
    if(this.isDoctors){
      this._patientService.addDoctorToPatient({patientId: this.patientId, doctorId: user._id}).subscribe((res)=>{
        this.closeMod();
      },(err)=>{
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
        });
      })
    }else{
      this._patientService.addNurseToPatient({patientId: this.patientId, nurseId: user._id}).subscribe((res)=>{
        this.closeMod();
      },(err)=>{
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
        });
      })
    }

  }

}
