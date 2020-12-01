import { commonModel } from "./common-model";

export class UserInfoDetails extends commonModel{
    card_identify_id: string;
    account_id: string;
    user_info_id: string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    email:string;
    contact: string;
    description: string;
    profile_resource_img_id: string;
    address: string;
    card_id: string;
    user_name: string;
}