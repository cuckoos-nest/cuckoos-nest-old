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

    //  id : number;
    //  photo : PhotoModel;
    //  description: string;
    //  user: UserModel;
    //  image: string;
    //  dateTime: string;
    //  likeCount: number;
    //  isLiked: Boolean;
}