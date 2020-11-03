import { Base64WriteImage, Base64Remove } from '../model/base64';

export class Base64WriteImageRequestAdd  {
    public body = new Base64WriteImage();
}

export class Base64WriteImagetRemove  {
    public body: Base64Remove;
}