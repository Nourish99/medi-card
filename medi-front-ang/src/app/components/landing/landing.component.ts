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
      text: "Hoy somos el centro privado cardiológico más completo del país en donde nuestro principal objetivo es cubrir toda la atención del paciente en beneficio de su salud, brindando atención medica profesional de alta calidad en un ambiente seguro. Por lo que se ha comprometido desde sus inicios con altos estándares de calidad que ha venido cumpliendo a través de certificaciones y acreditaciones:",
      image: HeartbeatMachineImg,
      left: false
    },
    {
      title: "Mision",
      text: "Cumplir por sobre todas las cosas con el compromiso de luchar por la salud y el bienestar de nuestros pacientes, cuidando de la vida humana a la que respetamos y valoramos. En reconocimiento al compromiso entregamos día a día, lo mejor de nosotros, con la calidad y calidez que somos capaces de desarrollar.",
      image: DoctorFemaleImg,
      left: true
    },
    {
      title: "Vision",
      text: "Somos una institución que a través de nuestra misión y nuestros valores, estaremos constantemente ofreciendo los adelantos de la ciencia médica con la más alta calidad, siempre al servicio de nuestro prójimo.",
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
  ]
}
