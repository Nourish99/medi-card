import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserNameIcon } from 'src/app/helpers/assets-helper';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less']
})
export class PatientsComponent implements OnInit {

  femaleIcon = UserNameIcon;
  maleIcon = UserNameIcon; 
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  deleteDialog = Swal.mixin({
    title: 'Estas seguro?',
    text: "No se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si borralo'
  })

  showModal = false;

  patientChoose = null;

  constructor(private _patientService: PatientServiceService, private formBuilder: FormBuilder,
    private _authService: AuthServiceService, private _router: Router){
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  patientList: any[] = [];

  isAdmin = false;

  ngOnInit(): void {
    this.getAllPatients();
    this.isAdmin = this._authService.isAdmin();
  }

  getAllPatients(){
    this._patientService.getAllPatients().subscribe((data)=>{
      this.patientList = data.data;
      this.patientList = this.patientList.map((item: any)=>{
        const date = new Date(item.birthdate);
        item.birthdate = date.toDateString()
        return item
      });
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }

  formatedBirthDate(date: string){
    return date.split('T')[0]
  }

  ImageProfile(gender:string){
    return gender == 'mujer' ? this.femaleIcon : this.maleIcon;
  }

  fullName(name:string, last:string){
    return `${name} ${last}`
  }

  openSigns(patient:any){
    this.patientChoose = patient;
    this.showModal = true;
  }

  onCloseModal(event: any){
    this.showModal = false;
    this.patientChoose = null;
  }

  navigatePatient(){
    this._router.navigate(['patient-form']);
  }

  deletePatient(userId:string){
    if(!userId || !this.isAdmin){
      return
    }

    this.deleteDialog.fire().then((result)=>{
      if (result.isConfirmed){
        this._patientService.deletePatient(userId).subscribe((res)=>{
          Swal.fire(
            'Eliminado!',
            'Paciente Eliminado',
            'success'
          )
          this.getAllPatients();
        }, (err)=>{
          Swal.fire(
            'Error!',
            err?.error?.error,
            'error'
          )
        })
      }
    })

  }
}
