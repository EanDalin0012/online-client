import { commonModel } from './common-model';
export class ProductModel extends commonModel {
    id: number;
    name: string;
    category_id: number;
    resource_img_id: number;
}