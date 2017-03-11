using CukoosApi.Data;
using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data.Entity;
using CukoosApi.Data.Entities;
using CukoosApi.Controllers.Base;
using System.Collections;
using CukoosApi.Repository;

namespace CukoosApi.Controllers
{
	public class NotificationsController : BaseApiController<NotificationsRepository, NotificationEntity>
	{
		#region Get
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult GetNotifications(bool? isRead = null)
		{
			IEnumerable<NotificationEntity> notifications = __currentUser.Notifications;

			if (isRead != null)
				notifications = notifications.Where(x => x.IsRead == isRead);

			return Ok(notifications.OrderByDescending(x => x.CreationDate).Select(x => new NotificationModel(x)));
		}
		#endregion

		#region Post
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult PostNotification(NotificationModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (model.sentByUser.id != __currentUser.Id)
				return BadRequest("User authentication failed");

			var entity = model.ToEntity();

			entity.SentByUser = __currentUser;
			entity.SentByUserId = __currentUser.Id;

			Repository().Add(entity);
			__db.SaveChanges();

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion

		#region Put
		/// <summary>
		/// Mark all notifications as read
		/// </summary>
		/// <returns></returns>
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult PutNotification()
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			foreach (NotificationEntity notification in __currentUser.Notifications)
			{
				notification.IsRead = true;
				__db.Entry(notification).State = EntityState.Modified;
			}

			__db.SaveChanges();

			return Ok();
		}
		#endregion
	}
}
