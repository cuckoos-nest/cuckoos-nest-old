using CukoosApi.Data.Enums;
using CukoosApi.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Models.Base;
using CukoosApi.Models.Base;

namespace CukoosApi.Models
{
	public class NotificationModel : BaseModel<NotificationEntity>
	{
		#region Properties
		public int type { get; set; }

		public int recivingUserId { get; set; }

		public UserModel sentByUser { get; set; }

		public string creationDate { get; set; }

        public bool isRead { get; set; }
		#endregion

		#region Constructor
		public NotificationModel()
			: base()
		{
		}

		public NotificationModel(NotificationEntity entity)
			: base(entity)
		{
		}
		#endregion

		#region Methods

		public override void FromEntity(NotificationEntity entity)
		{
			this.id = entity.Id;
			this.type = (int)entity.Type;
			this.recivingUserId = entity.ReceivingUserId;
			this.sentByUser = new UserModel(entity.SentByUser);
			this.creationDate = entity.CreationDate.ToString();
            this.isRead = entity.IsRead;
        }

		public override NotificationEntity ToEntity()
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
		#endregion
	}
}