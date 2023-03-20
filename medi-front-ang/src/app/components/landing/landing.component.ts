import { Component } from '@angular/core';
import { CreditCardIcon, DoctorConsultImg, DoctorFemaleImg, DoctorIcon, EyeIcon, HeartbeatMachineImg, OperationImg, SecurityIcon } from 'src/app/helpers/assets-helper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent {

  landingCards = [
    {
      title: "Quienes somos",
      text: "Somos un sistema de gestión de datos de salud que permite a los hospitales almacenar, administrar y compartir su información médica con profesionales de la salud, familiares y otros cuidadores de confianza.",
      image: HeartbeatMachineImg,
      left: false
    },
    {
      title: "Mision",
      text: "Nuestra misión es desarrollar un sistema avanzado de información al paciente que ofrezca un acceso seguro y fácil a la información médica de cada persona, permitiéndoles comprender y gestionar su propia salud. Nos esforzamos por ser líderes en innovación tecnológica para mejorar la experiencia del paciente y promover una atención médica más centrada en el paciente.",
      image: DoctorFemaleImg,
      left: true
    },
    {
      title: "Vision",
      text: "Nuestra visión es mejorar la calidad de vida de los pacientes mediante un sistema avanzado de información al paciente que les permita acceder a información médica confiable, actualizada y fácil de entender. Además de ofrecer un servicio de innovación promoviendo la satisfacción de calidad de la atención a las necesidades del enfermero paciente y familia donde las personas puedan obtener información en tiempo real acerca del estado de salud de sus usuarios.",
      image: OperationImg,
      left: false
    },
    {
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
      
    }
  ]
}
