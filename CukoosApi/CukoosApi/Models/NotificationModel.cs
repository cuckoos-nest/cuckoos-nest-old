using CukoosApi.Data.Enums;
using CukoosApi.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Models.Interfaces;

namespace CukoosApi.Models
{
	public class NotificationModel : IModel
	{
		#region Properties
		public long id { get; set; }

		public int type { get; set; }

		public int recivingUserId { get; set; }

		public UserModel sentByUser { get; set; }

		public string creationDate { get; set; }

        public bool isRead { get; set; }
		#endregion

		#region Consturctors
		public NotificationModel()
		{
		}

		public NotificationModel(NotificationEntity entity)
		{
			this.id = entity.Id;
			this.type = (int)entity.Type;
			this.recivingUserId = entity.ReceivingUserId;
			this.sentByUser = new UserModel(entity.SentByUser);
			this.creationDate = entity.CreationDate.ToString();
            this.isRead = entity.IsRead;
        }
		#endregion

		public NotificationEntity ToEntity()
		{
			return new NotificationEntity()
			{
				Id = this.id,
				Type = (NotificationType)this.type,
				ReceivingUserId = this.recivingUserId,
				SentByUserId = this.sentByUser.id,
				CreationDate = DateTime.Parse(this.creationDate),
                IsRead = this.isRead,
            };
		}
	}
}