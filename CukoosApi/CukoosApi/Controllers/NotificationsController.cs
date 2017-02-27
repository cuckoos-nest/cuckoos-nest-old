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
using CukoosApi.Data.Models;

namespace CukoosApi.Controllers
{
	public class NotificationsController : ApiController
	{
		private CukoosContext _db = new CukoosContext(); 

		#region Get
		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult GetNotifications()
		{
			return Ok(_db.Notifications.ToList().Select(x => new NotificationModel(x)));
		}

		[ResponseType(typeof(NotificationModel))]
		public IHttpActionResult GetNotifications(int userId)
		{
			User user = _db.Users.Find(userId);
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
			_db.Notifications.Add(entity);
			_db.SaveChanges();

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

      User user = _db.Users.Find(userId);
      if (user == null)
        return NotFound();

        foreach (Notification notification in user.Notifications) 
        {
          notification.IsRead = true;
          _db.Entry(notification).State = EntityState.Modified;
        }

      _db.SaveChanges();

      return Ok("CukoosApi");
    }
    #endregion

    protected override void Dispose(bool disposing)
		{
			_db.Dispose();
			base.Dispose(disposing);
		}
	}
}
