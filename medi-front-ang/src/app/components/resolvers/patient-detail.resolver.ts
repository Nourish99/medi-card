import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { PatientServiceService } from 'src/app/services/patient-service.service';



@Injectable({ providedIn: 'root' })
export class PatientDetailResolver implements Resolve<any>{
    constructor(private _patientService: PatientServiceService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<any> {
        return new Promise((res)=>{
            try{
                const patientId = route.paramMap.get('id');
                if(!patientId){
                    res(false)
                    return;
                }
                this._patientService.getPatitentById(patientId).subscribe((data)=>{
                    res({data});
                }, (erro)=>{
                    res(false);
                })
            }catch(err){
                res(false)
            }
        });
    }
}