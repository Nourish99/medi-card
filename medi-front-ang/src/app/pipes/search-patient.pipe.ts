import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchPatientFilter"
})

export class SearchPatientPipe implements PipeTransform{

    transform(
        value: any[],
        search: any
      ):any {
        if(!search){
            return value
        }
        if (value) {
          const regexp = new RegExp(search, 'i');
          const properties = Object.keys(value[0]);
          return [
            ...value.filter((item) => {
              return properties.some((property) => regexp.test(item[property]));
            }),
          ];
        }
      }
}