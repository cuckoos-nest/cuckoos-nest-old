import { UserModel } from "./user.model";

import { NotificationType } from "../enums/notification-type.enum";

export class NotificationModel {
     public id: number;
     public type: NotificationType;
     public recivingUserId: number;
     public sentByUser: UserModel;
     public creationDate: string;
     public isRead: Boolean;
}