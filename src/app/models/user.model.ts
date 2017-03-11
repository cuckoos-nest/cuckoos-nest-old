import { CategoryModel } from "./category.model";
import { PhotoModel } from "./photo.model";

export class UserModel {
     id : number;
     fb_id : number;
     email : string;
     displayName : string;
     image: string;
     categoriesImFollowing: number[];
     usersImFollowing: number[];
     numberOfFollowers: number;
     numberOfFollowing: number;
     numberOfUploads: number;
}