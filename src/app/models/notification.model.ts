// import { UserModel } from "./user.model";
import { NotificationType } from "../enums/notification-type.enum";
import { BaseModel } from './base/base.model';

export class NotificationModel extends BaseModel {
    from: string;
    type: NotificationType;
    isRead: Boolean;
    upload: string;
    createdAt: Date;

    //  public id: number;
    //  public type: NotificationType;
    //  public recivingUserId: number;
    //  public sentByUser: UserModel;
    //  public creationDate: string;
    //  public isRead: Boolean;
}