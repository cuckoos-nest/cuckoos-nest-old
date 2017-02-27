using CukoosApi.Data.Enums;
using CukoosApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
	public class NotificationModel
	{
		#region Properties
		public long id { get; set; }

		public int type { get; set; }

		public int recivingUserId { get; set; }

		public int sentByUserId { get; set; }

		public string creationDate { get; set; }

        public bool isRead { get; set; }
		#endregion

		#region Consturctors
		public NotificationModel()
		{
		}

		public NotificationModel(Notification entity)
		{
			this.id = entity.Id;
			this.type = (int)entity.Type;
			this.recivingUserId = entity.ReceivingUserId;
			this.sentByUserId = entity.SentByUserId;
			this.creationDate = entity.CreationDate.ToString();
            this.isRead = entity.IsRead;
        }
		#endregion

		public Notification ToEntity()
		{
			return new Notification()
			{
				Id = this.id,
				Type = (NotificationType)this.type,
				ReceivingUserId = this.recivingUserId,
				SentByUserId = this.sentByUserId,
				CreationDate = DateTime.Parse(this.creationDate),
                IsRead = this.isRead,
            };
		}
	}
}