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
    likesCount: number;
    commentsCount: number;
    createdAt: string;
}