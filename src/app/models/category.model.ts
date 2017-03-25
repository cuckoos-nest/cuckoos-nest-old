import { BaseModel } from './base/base.model';

export class CategoryModel extends BaseModel {
     name : string;
     image: string;
     numberOfUploads: number;
     numberOfFollowers: number;
}