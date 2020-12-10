import { ProductDescription } from '../model/product-description';
import { ResourceID } from '../model/resource-id';

export class ProductDescriptionRequest{
    public body = {
        product_description: new ProductDescription(),
        resource_id: new Array<ResourceID>()
    }
}