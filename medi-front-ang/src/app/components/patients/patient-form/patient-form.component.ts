import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.less']
})
export class PatientFormComponent implements OnInit, AfterViewInit{

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
  patientId = '';

  editMode = false;
  constructor(private _patientService: PatientServiceService, private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder){
      this.FormData = this.formBuilder.group({
        name: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        age: [0, [Validators.required]],
        address: [''],
        birthdate: [new Date()],
        gender: ['hombre'],
        room: [0, [Validators.required]],
        illness: ['']
      })
    }

  ngOnInit(): void {
    const { patientID } = this.route.snapshot.queryParams;
    this.patientId = patientID;
  }
  ngAfterViewInit() {
    if (!!this.patientId) {
      this.loadPatientInfo();
    }
  }

  loadPatientInfo(){
    this._patientService.getPatitentById(this.patientId).subscribe((res)=>{
      this.FormData.setValue({
        name: res.data.name,
        lastname: res.data.lastname,
        age: res.data.age,
        address: res.data.address,
        birthdate: res.data.birthdate,
        gender: res.data.gender,
        room: res.data.room,
        illness: res.data.illness
      })
      this.editMode = true;
    }, (err)=>{
      console.log('err');
      this.router.navigate(['home'])
    });
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

   onSubmit(FormData: any) {
    if(FormData.invalid){
      return;
    }
    if(this.editMode){
      console.log(FormData)

      const obj = FormData;
      obj.id = this.patientId;
      this._patientService.editPatient(obj).subscribe((res)=>{
        if(res.error == null){
         
          Swal.fire({
            title: 'Actualizacion Exitosa',
            icon: 'success',
            html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Paciente Actualizado!</strong>`,
          });
          this.router.navigate(['patients']);
         
        }else{
          Swal.fire({
            title: 'Actualizacion Error',
            icon: 'error',
            html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${res.error.error}</strong>`,
          });
        }
      }, (err)=>{
        Swal.fire({
          title: 'Actualizacion Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
        });
      })
      return;
    }
    this._patientService.newPatient(FormData).subscribe((res)=>{
      if(res.error == null){
       
        Swal.fire({
          title: 'Registro Exitoso',
          icon: 'success',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Registro exitoso</strong>`,
        });
        this.router.navigate(['patients']);
       
      }else{
        Swal.fire({
          title: 'Registro Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">error ${res.error.error}!</strong>`,
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
