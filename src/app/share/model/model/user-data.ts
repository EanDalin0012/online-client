import { commonModel } from './common-model';
export class UserDataModel extends commonModel {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    date_birth: string;
    email: string;
    contact: string;
    kh_id: string;
    resource_img_id: string;
    description: string;
    address: string;
}