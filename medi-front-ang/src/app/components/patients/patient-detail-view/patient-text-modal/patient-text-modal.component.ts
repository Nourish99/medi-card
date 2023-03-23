import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-text-modal',
  templateUrl: './patient-text-modal.component.html',
  styleUrls: ['./patient-text-modal.component.less']
})
export class PatientTextModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();
  @Input() fieldToUpdate = '';
  @Input() lastValue = '';
  @Input() patientId = '';

  modulesTolbar = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'] // remove formatting button
    ]
  };

  @Input() control: FormControl = new FormControl();
  constructor(private _patientService: PatientServiceService) {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
    this.control.setValue(this.lastValue);
  }

  closeMod() {
    this.closeModal.emit(true);
  }

  save(event: any) {
    event.stopPropagation();
    const requesto: any = {
      id: this.patientId 
    }
    requesto[this.fieldToUpdate] = this.control.value;

    this._patientService.editPatient(requesto).subscribe((res)=>{
      this.closeModal.emit();
    },(err)=>{
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
      });
    });

  }

  get modalTitle(){
    return this.fieldToUpdate == 'medicines' ? 'Agregar medicinas' :
    this.fieldToUpdate == 'nurseNotes' ? 'Agregar Notas' : 
    this.fieldToUpdate == 'recomendations' ? 'Agregar recomendaciones' : 'Agregar'
  }
}
