import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../share/model/model/category';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { ResponseStatus, ButtonRole } from '../../share/constants/common.const';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  categoryName: string;
  description: string;
  id: number;

  translateTxt: any;
  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
    });
    if (this.modal) {
        this.categoryName = this.modal.message.name;
        this.description   = this.modal.message.description;
        this.id             = this.modal.message.id;
     }
  }

  register(): void {
    if ( this.isValid() === true) {
      let category          = new CategoryModel();
      category.name         = this.categoryName;
      category.description  = this.description;
      category.id           = this.id;
      const api = '/api/category/v1/update';
      this.serverService.HTTPPost(api, category).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRole.edit});
        }
      });
    }
}

isValid(): boolean {
  if (!this.categoryName || this.categoryName && this.categoryName.trim() === ''
      || this.categoryName && this.categoryName === null) {
        const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED);
        return bool;
  } else {
    return true;
  }
}

  close(): void {
    this.modal.close( {close: ButtonRole.close});
  }

  onClickButtonMainCategoryName(): void {
      this.categoryName = undefined;
  }

  onClickButtonDescription(): void {
    this.description = undefined;
  }

}
