import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    if (!value) return 'Holiday';
    let timeArr = value.split(':');
    if (timeArr.length === 2) {
      let hours = Number(timeArr[0]);
      if (hours > 12) return hours - 12 + ':' + timeArr[1] + ' PM';
      if (hours === 12) return timeArr[0] + ':' + timeArr[1] + ' PM';
      return timeArr + ' AM';
    }
  }
}
