import { commonModel } from './common-model';
export class VendorModel extends commonModel {
    id: number;
    name: String;
    contact: string;
    email: string;
    address: String;
    description: string;
    other_contact: string;
}