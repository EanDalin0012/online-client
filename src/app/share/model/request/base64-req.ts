import { Base64WriteImage, Base64Remove } from '../model/base64';

export class Base64RequestAdd  {
    public body: Base64WriteImage;
}

export class Base64RequestRemove  {
    public body: Base64Remove;
}