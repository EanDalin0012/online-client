import { commonModel } from './common-model';

export class UserInfo extends commonModel {
    id: number;
    account_expired: boolean;
    account_locked: boolean;
    credentials_expired: boolean;
    enabled: boolean;
    user_name: string;
    resource_img_id: string;
}