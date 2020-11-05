import { ProductModel } from '../model/product';
import { ProductDetailsModel } from '../model/product-details';
export class ProductModelResponse {
    public body = new Array<ProductModel>();
}

export class ProductDetaitsModelResponse {
    public body = new Array<ProductDetailsModel>();
}