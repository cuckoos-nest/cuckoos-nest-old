import { UserModel } from "./user.model";

export class CommentModel {
     id : number;
     user: UserModel;
     content: string;
}