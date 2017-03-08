import { CategoryModel } from "./category.model";

export class PhotoModel {
     id : number;
     title : string;
     image : string;
     category : CategoryModel;
}