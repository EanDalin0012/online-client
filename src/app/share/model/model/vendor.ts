import { commonModel } from './common-model';
export class VendorModel extends commonModel {
    id: number;
    name: string;
    contact: string;
    email: string;
    address: string;
    description: string;
    other_contact: string;
}