import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-imgs-modal',
  templateUrl: './patient-imgs-modal.component.html',
  styleUrls: ['./patient-imgs-modal.component.less']
})
export class PatientImgsModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();
  @Input() patientId = '';

  FormData: FormGroup = new FormGroup({
    images: new FormControl()
  });

  constructor(private _patientService: PatientServiceService){

  }


  ngOnInit(): void {
    this.FormData = new FormGroup({
      images: new FormControl()
    });
  }

  closeMod() {
    this.closeModal.emit(true);
  }
  save(event: any){
    if(this.imagesPreview.length == 0){
      return;
    }
    const requesto = {
      id: this.patientId,
      radios: this.imagesPreview
    };
    this._patientService.addRadios(requesto).subscribe((res)=>{
      this.closeModal.emit();
    },(err)=>{
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
      });
    });
  }

  fnExtraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return;
    } catch (e) {
      console.log(e)
      return null;
    }
  })

  imagesPreview: any[] = [];

  fnLoadFoto(event: any, foto: string) {
    console.log(event?.target?.files)
    const imfFile:any[] = event?.target?.files;
    const filesBase: any[] = [];
    for (let i = 0; i < imfFile.length; i++) {
      filesBase.push( this.fnExtraerBase64(imfFile[i]))
    }
    Promise.all(filesBase).then((values) => {
      this.imagesPreview = values.map((ite)=>{
        return ite.base
      })
    });

  }
}
