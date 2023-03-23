import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-familiar-form',
  templateUrl: './familiar-form.component.html',
  styleUrls: ['./familiar-form.component.less']
})
export class FamiliarFormComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();
  @Input() patientId = '';

  FormData: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, [Validators.required]),
    gender: new FormControl('hombre')

  });
  constructor(private formBuilder: FormBuilder, private _authService: AuthServiceService){
    this.FormData = this.formBuilder.group({
      username: [ '', [Validators.required]],
        name: [ '', [Validators.required]],
        lastname:[ '', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        age: [0, [Validators.required]],
        gender: ['hombre']
    })
  }

  ngOnInit(): void {
      
  }

  closeMod() {
    this.closeModal.emit(true);
  }
  save(event: any){
    if(this.FormData.invalid){
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Revisa el formulario!</strong>`,
      });
      return;
    }
    const requesto = this.FormData.value;

    requesto['role'] = 'familiar';
    requesto['patientId'] = this.patientId;

    this._authService.register(requesto).subscribe((res)=>{
      this.closeModal.emit();
      },(err)=>{
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: `<strong class="FontMontserratTitles" style="font-size: 22px;">${err.error.error}</strong>`,
        });
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.FormData.controls;
  }

}
