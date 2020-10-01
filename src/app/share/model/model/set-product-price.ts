import { commonModel } from './common-model';

export class SetProductPriceModel extends commonModel{
    id: number;
    name: string;
    price: number;
    currency: string;
    sale_price: number;
    discount: number;
    sale_price_after_discount: number;
}