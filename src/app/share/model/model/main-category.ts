import { commonModel } from './common-model';

export interface MainCategory extends commonModel {
  id: number;
  name: string;
  description: string;
}
