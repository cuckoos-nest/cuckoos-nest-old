// import { PhotoModel } from "./photo.model";
// import { UserModel } from "./user.model";
// import { CommentModel } from "./comment.model";
// import { LikeModel } from "./like.model";
import { BaseModel } from './base/base.model';

export class UserUploadModel extends BaseModel {
    description: string;
    image: string;
    user: string;
    photo: string;
    likesCount: string;
    commentsCount: string;
    createdAt: string;

    //  id : number;
    //  photo : PhotoModel;
    //  description: string;
    //  user: UserModel;
    //  image: string;
    //  isLiked: Boolean;
}