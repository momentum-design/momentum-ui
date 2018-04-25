import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDash'
})
export class ReplaceDashPipe implements PipeTransform {

  transform(value: any, arg: any = ' '): any {
    return value.replace(/-/g, arg);
  }

}
