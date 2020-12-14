import { ProductDescription } from '../model/product-description';
import { ResourceID } from '../model/resource-id';

export class ProductDescriptionRequest{
    public body = {
        product_id: 0,
        product_description: new ProductDescription(),
        resource_id: new Array<ResourceID>()
    }
}