import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ClockService, valorReloj } from 'src/app/services/clock.service';

@Component({
  selector: 'app-patient-detail-modal',
  templateUrl: './patient-detail-modal.component.html',
  styleUrls: ['./patient-detail-modal.component.less']
})
export class PatientDetailModalComponent implements OnInit, OnDestroy{

  @Input() patient:any = null;

  @Output() closeModal= new EventEmitter<any>();

  datos$: Observable<valorReloj> | undefined;
  hora: number = 0;
  minutos: string = '';
  dia: string = '';
  fecha: string = '';
  ampm: string = '';
  segundos: string = '';

  constructor(private segundo: ClockService){

  }

  ngOnInit(): void {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

  ngOnDestroy(): void {
    this.datos$ = undefined;
  }

  closeMod(){
    this.closeModal.emit(true);
  }

  formatedBirthDate(date: string){
    return date.split('T')[0]
  }

  get currentDate(){
    return `${this.dia} ${this.fecha}. ${this.hora}:${this.minutos}:${this.segundos} ${this.ampm}`
  }
}
