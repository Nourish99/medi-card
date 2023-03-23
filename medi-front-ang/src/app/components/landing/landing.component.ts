import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardIcon, DoctorConsultImg, DoctorFemaleImg, DoctorIcon, EyeIcon, HeartbeatMachineImg, OperationImg, PatientsBanner, SecurityIcon } from 'src/app/helpers/assets-helper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent {

  patientsBanner = PatientsBanner;

  landingCards = [
    {
      id:'us',
      title: "Quienes somos",
      text: "SAIP es un sistema web realizado para brindar información necesaria a pacientes, familiares y personal de salud a través de tecnología con la finalidad de mejorar la comunicación efectiva",
      image: HeartbeatMachineImg,
      left: false
    },
    {
      id:'mision',
      title: "Mision",
      text: "Nuestra misión es desarrollar un sistema avanzado de información al paciente que ofrezca un acceso seguro y fácil a la información médica de cada persona, permitiéndoles comprender y gestionar su propia salud. Nos esforzamos por ser líderes en innovación tecnológica para mejorar la experiencia del paciente y promover una atención médica más centrada en el paciente.",
      image: DoctorFemaleImg,
      left: true
    },
    {
      id:'vision',
      title: "Vision",
      text: "Nuestra visión es mejorar la calidad de vida de los pacientes mediante un sistema avanzado de información al paciente que les permita acceder a información médica confiable, actualizada y fácil de entender. Además de ofrecer un servicio de innovación promoviendo la satisfacción de calidad de la atención a las necesidades del enfermero paciente y familia donde las personas puedan obtener información en tiempo real acerca del estado de salud de sus usuarios.",
      image: OperationImg,
      left: false
    },
    {
      id:'valores',
      title: "Valores",
      text: "Reconocemos y comprendemos el gran valor de cada persona como individuo. Tratamos a todos los que servimos con cariño, comprensión y amabilidad. Actuamos con absoluta honestidad, integridad y justicia en la manera en que llevamos nuestra institución, nuestra vida y nuestra profesión, tratándonos con respeto y dignidad.",
      image: DoctorConsultImg,
      left: true
    },
  ];

  landingServices = [
    {
      title: "Especialistas",
      icon: DoctorIcon
    },
    {
      title: "Seguridad al paciente",
      icon: SecurityIcon
    },
    {
      title: "Informacion del paciente",
      icon: EyeIcon
    },
    {
      title: "Pago de servicios",
      icon: CreditCardIcon
    },
  ];
  landingPatientServices = [
    {
      title: "Monitorización continúa.",
      subs: []
    },
    {
      title: "Procedimientos invasivos. ",
      subs: ["venoclisis", "sondajes", "drenajes", "colocación de catéter"]
    },
    {
      title: "Vigilancia y control de líquidos.",
      subs: []
    },
    {
      title: "Registro de enfermería.",
      subs: []
    },
    {
      title: "Pruebas de gabinete.",
      subs: [ "Laboratorios", "tomografía", "radiografía", "gammagrafía", "ultrasonidos"]
    },
    {
      title: "Electrocardiogramas.",
      subs: []
    },
    {
      title: "Rehabilitación cardiovascular.",
      subs: []
    },
    {
      title: "Movilización de postura en cama.",
      subs: []
    },
    {
      title: "8 metas internacionales.",
      subs: []
    },
    {
      title: "Electrocardiogramas. ",
      subs: []
    },
     {
      title: "Fármacoterapia.",
      subs: []
    },
    {
      title: "Fluidoterapia.",
      subs: []
    }
  ]

  constructor(private router: Router){

  }

  navigateUs(){
    this.router.navigate(['/home'], { fragment: 'us' });

  }
}
