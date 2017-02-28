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

namespace CukoosApi.Controllers
{
	public class NotificationsController : BaseApiController
	{
		#region Get
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult GetNotifications()
		{
			return Ok(__db.Notifications.ToList().Select(x => new NotificationModel(x)));
		}

		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult GetNotifications(int userId)
		{
			UserEntity user = __db.Users.Find(userId);
			if (user == null)
				return NotFound();

			return Ok(user.Notifications.Select(x => new NotificationModel(x)));
		}
		#endregion

		#region Post
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult PostNotification(NotificationModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var entity = model.ToEntity();
			__db.Notifications.Add(entity);
			__db.SaveChanges();

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion

		#region Put
		/// <summary>
		/// Mark all notifications as read
		/// </summary>
		/// <param name="userId"></param>
		/// <returns></returns>
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult PutNotification(int userId)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			UserEntity user = __db.Users.Find(userId);
			if (user == null)
				return NotFound();

			foreach (NotificationEntity notification in user.Notifications)
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
