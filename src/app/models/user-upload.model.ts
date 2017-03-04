import { PhotoModel } from "./photo.model";
import { UserModel } from "./user.model";
import { CommentModel } from "./comment.model";
import { LikeModel } from "./like.model";

export class UserUploadModel {
     id : number;
     photo : PhotoModel;
     description: string;
     user: UserModel;
     imageUrl: string;
     imageBase64: string;
     dateTime: string;
     likeCount: number;
     isLiked: Boolean;
}