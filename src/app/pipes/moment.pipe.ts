import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
import 'moment/locale/es'; // without this line it didn't work
moment.locale('es');

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string, ...args) {
    return moment(value).fromNow();
  }

}
