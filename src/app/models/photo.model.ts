import { CategoryModel } from "./category.model";

export class PhotoModel {
     id : number;
     title : string;
     imageUrl : string;
     category : CategoryModel;
}