import { commonModel } from './common-model';
export class UserModel extends commonModel {
    id: number;
    first_name: string;
    last_name: string;
    birt_date: string;
    resource_info_id: string;
    email: string;
    contact: string;
    description: string;
    password: string;
  }