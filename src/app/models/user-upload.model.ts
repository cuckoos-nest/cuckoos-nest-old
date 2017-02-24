import { PhotoModel } from "./photo.model";
import { UserModel } from "./user.model";

export class UserUploadModel {
     id : number;
     photo : PhotoModel;
     description: string;
     user: UserModel;
     imageUrl: string;
}