import { BaseModel } from './base/base.model';

export class UserModel extends BaseModel {
     displayName: string;
     categoryFollowingCount: number;
     numberOfFollowing: number;
     numberOfFollowers: number;
     image: string;
     numberOfUploads: number;
}