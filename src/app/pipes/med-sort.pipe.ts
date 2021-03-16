import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medSort'
})
export class MedSortPipe implements PipeTransform {

  transform(array: Array<any>, category: string, asc = true): Array<any> {
    if (!Array.isArray(array)) {
      return;
    } else if( category == '' ) {
      return array;
    }
    
    
    array.sort((a: any, b: any) => {
      if( asc ) {
        if (a[category] < b[category]) {
          return -1;
        } else if (a[category] > b[category]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[category] > b[category]) {
          return -1;
        } else if (a[category] > b[category]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }

}
