import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    gender: new FormControl(''),
    room: new FormControl(0, [Validators.required]),
    illness: new FormControl('')

  });

  medicines: string[] = [];
  recomendations: string[] = [];

  medicine = '';
  recomendation = '';
  constructor(){}

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

}
