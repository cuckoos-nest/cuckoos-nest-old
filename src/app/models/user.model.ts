import { CategoryModel } from "./category.model";
import { PhotoModel } from "./photo.model";

export class UserModel {
     id : number;
     fb_id : number;
     followingPhotos: PhotoModel[];
     followingCategories: CategoryModel[];
}