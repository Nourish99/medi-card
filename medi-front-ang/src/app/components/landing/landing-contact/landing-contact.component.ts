import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-contact',
  templateUrl: './landing-contact.component.html',
  styleUrls: ['./landing-contact.component.less']
})
export class LandingContactComponent implements OnInit {
  FormData: FormGroup = new FormGroup({
    Fullname: new FormControl('', [Validators.required]),
    Cellphone: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required,Validators.email]),
    Comment: new FormControl('', [Validators.required]),
  })
  constructor(private builder: FormBuilder){}
  
  ngOnInit(): void {
  }

  onSubmit(FormData: any) {
    console.log(FormData)
    this.FormData.reset()
    
  }
}
