import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.less']
})
export class PatientFormComponent implements OnInit{

  FormData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    address: new FormControl(''),
    birthdate: new FormControl(new Date()),
    gender: new FormControl('hombre'),
    room: new FormControl(0, [Validators.required]),
    illness: new FormControl('')

  });

  medicines: string[] = [];
  recomendations: string[] = [];

  medicine = '';
  recomendation = '';
  constructor(private _patientService: PatientServiceService, private router: Router){}

  ngOnInit(): void {
      
  }

  addMedicine(med: string){
    this.medicines.push(med)
  }

  removeMedicine(id: number){
    this.medicines.splice(id,1);
  }

  addRecomendation(req: string){
    this.recomendations.push(req);
  }

  removeRecomendation(id: number){
    this.recomendations.splice(id,1);
  }

   get f(): { [key: string]: AbstractControl } {
    return this.FormData.controls;
  }

   onSubmit(FormData: FormGroup) {
    if(FormData.invalid){
      return;
    }
    this._patientService.newPatient(FormData).subscribe((res)=>{
      if(res.error == null){
       
        Swal.fire({
          title: 'Login Exitoso',
          icon: 'success',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Bienvenido Admin!</strong>`,
        });
        this.router.navigate(['patients']);
       
      }else{
        Swal.fire({
          title: 'Login Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Credenciales invalidas!</strong>`,
        });
      }
    }, (err)=>{
      Swal.fire({
        title: 'Login Error',
        icon: 'error',
        html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
      });
    })
  }

}
