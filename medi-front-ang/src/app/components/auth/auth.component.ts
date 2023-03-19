import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordIcon, UserNameIcon } from 'src/app/helpers/assets-helper';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit{

  FormData: FormGroup = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  usernameIcon = UserNameIcon;
  passIcon = PasswordIcon;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AuthServiceService,
    private router: Router,
    private storageService: StorageServiceService,
  ) { }

  ngOnInit(): void {
    this.FormData = this.formBuilder.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(FormData: FormGroup) {
    console.log(FormData)
    if(FormData.invalid){
      return;
    }

    this.accountService.auth({
      username: this.FormData.value.Username, 
      password: this.FormData.value.Password}
      ).subscribe((res) => {
        if(res.error == null){
          this.accountService.setAuth(res.data);
          Swal.fire({
            title: 'Login Exitoso',
            icon: 'success',
            html: `<strong class="FontMontserratTitles" style="font-size: 22px;">Bienvenido Admin!</strong>`,
          });
          const role = res.data?.userdata?.role
          if(role == 'admin'){
            this.router.navigate(['dashboard']);
          }else{
            this.router.navigate(['patients']);
          }
         
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

    this.FormData.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.FormData.controls;
  }
}
