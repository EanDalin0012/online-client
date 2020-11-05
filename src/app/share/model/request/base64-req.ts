import { Base64WriteImage, Base64Remove } from '../model/base64';
import { SRCModel } from '../model/src';

export class Base64WriteImageRequestAdd  {
    public body = new Base64WriteImage();
}

export class Base64WriteImagetRemove  {
    public body: Base64Remove;
}
