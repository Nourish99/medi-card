import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserNameIcon } from 'src/app/helpers/assets-helper';

@Component({
  selector: 'app-patient-detail-view',
  templateUrl: './patient-detail-view.component.html',
  styleUrls: ['./patient-detail-view.component.less']
})
export class PatientDetailViewComponent implements OnInit {

  patientData: any = null;
  femaleIcon = UserNameIcon;
  maleIcon = UserNameIcon;
  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    const patientData: any = JSON.parse(
      JSON.stringify(this.route.snapshot.data['patientData'].data.data)
    );

    this.patientData = patientData;
    console.log(this.patientData)
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

  get hasFamiliar(){
    return this.patientData 
    && this.patientData.familiar 
  }

  get currentNurses(){
    return this.hasNurses ? this.patientData.nursesAtendence : []
  }

  get patientMedicines(){
    return this.patientData.medicines ? this.patientData.medicines : []
  }

}
