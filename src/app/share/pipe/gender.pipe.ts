import { Pipe, PipeTransform } from '@angular/core';
import { GENDER_CODE_LIST } from '../constants/common.const';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) {
  }
  transform(value: unknown): String {
    // Male
    if(value === GENDER_CODE_LIST[0].value) {
      return this.translateService.instant(GENDER_CODE_LIST[0].text);
    } else if(value === GENDER_CODE_LIST[1].value) {
      return this.translateService.instant(GENDER_CODE_LIST[1].text);
    } else {
      return this.translateService.instant(GENDER_CODE_LIST[2].text);
    }
  }

}
