import { Pipe, PipeTransform } from '@angular/core';
import { RequestDataService } from '../service/get-data.service';
import { SRCResponseModel } from '../model/response/res.scr';

@Pipe({
  name: 'srcPipe'
})
export class SrcPipe implements PipeTransform {

  constructor(
    private requestDataService: RequestDataService
  ) {

  }
  transform(value: string) {
    console.log(value);
    if(value) {
      this.requestDataService.srcRequest(value).then(res=>{
        const data = res as SRCResponseModel;
        console.log("data:image/jpeg;base64,"+data.body.src);
        
        return "data:image/jpeg;base64,"+data.body.src;
      });
    }
  }

}
