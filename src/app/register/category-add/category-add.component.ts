import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../share/service/modal.service';
import { ButtonRole, ResponseStatus } from '../../share/constants/common.const';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { CategoryModel } from '../../share/model/model/category';
import { HttpService } from '../../share/service/http.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  categoryName: string;
  description: string;

  translateTxt: any;
  constructor(
    private translate: TranslateService,
    private httpService: HttpService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
     });
  }

  btnRegister(): void {
    if ( this.isValid() === true) {
      const category          = new CategoryModel();
      category.name               = this.categoryName;
      category.description        = this.description;
      const api = '/api/category/v1/save';
      this.httpService.Post(api, category).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRole.save});
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

  onClickBtnMainCategoryName(): void {
      this.categoryName = undefined;
  }

  onClickButtonDescription(): void {
    this.description = undefined;
  }

}
