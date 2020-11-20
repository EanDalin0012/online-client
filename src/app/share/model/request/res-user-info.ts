import { PersonalInfo } from '../model/personsal-info';
import { Profile } from '../model/profile';
import { CardIdentify } from '../model/card-identify';
import { AccountInfo } from '../model/account-info';

export class UserInfoRequestModel {
    public body = {
        personalInfo: new PersonalInfo(),
        profile: new Profile(),
        cardIdentify: new CardIdentify(),
        accountInfo: new AccountInfo()
    }
}