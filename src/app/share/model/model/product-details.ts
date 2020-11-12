import { commonModel } from './common-model';
export class ProductDetailsModel extends commonModel{
    id: number;
    name: string;
    category_id: number;
    category_name: String;
    resource_img_id: string;
    description: string;
}