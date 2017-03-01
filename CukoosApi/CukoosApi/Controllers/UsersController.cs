using CukoosApi.Controllers.Base;
using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
	public class UsersController : BaseApiController
	{
		#region Get
		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUsers()
		{
			return Ok(__db.Users.ToList().Select(x => new UserModel(x)));
		}

		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUser(int id)
		{
			UserEntity entity = __db.Users.Find(id);

			if (entity == null)
				return NotFound();

			return Ok(new UserModel(entity));
		}

		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUsers(long fb_id)
		{
			UserEntity entity = __db.Users.FirstOrDefault(x => x.FacebookId == fb_id);

			if (entity == null)
				return NotFound();

			return Ok(new UserModel(entity));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutUser(UserModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (model.id != __currentUser.Id)
				return BadRequest();

			if (string.IsNullOrEmpty(model.imageUrl) == false)
				SetUserImageByUrl(__currentUser.Id, model.imageUrl);
			// Other changes...

			__db.Entry(__currentUser).State = EntityState.Modified;

			__db.SaveChanges();

			return StatusCode(HttpStatusCode.OK);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostUser([FromBody] UserModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var entity = model.ToEntity();

			__db.Users.Add(entity);
			__db.SaveChanges();

			if (string.IsNullOrEmpty(model.imageUrl) == false)
				model.imageUrl = SetUserImageByUrl(entity.Id, model.imageUrl);

			model = new UserModel(__db.Users.Single(x => x.Id == entity.Id));

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion

		#region Delete
		[ResponseType(typeof(UserModel))]
		public IHttpActionResult DeleteUser(int id)
		{
			UserEntity entity = __db.Users.Find(id);

			if (entity == null)
				return NotFound();

			__db.Users.Remove(entity);
			__db.SaveChanges();

			return Ok(new UserModel(entity));
		}
		#endregion

		#region Private Methods
		private bool UserExists(int id)
		{
			return __db.Users.Any(e => e.Id == id);
		}

		private string SetUserImageByUrl(int id, string imageUrl)
		{
			string localPath = HttpRuntime.AppDomainAppPath + $"assets/userImages/{id}.png";
			using (WebClient client = new WebClient())
			{
				client.DownloadProgressChanged += (object sender, DownloadProgressChangedEventArgs e) =>
				{
					if (e.TotalBytesToReceive > int.Parse(ConfigurationManager.AppSettings["MaxImageSize"]))
					{
						client.CancelAsync();
					}
				};
				client.DownloadFile(imageUrl, localPath);
			}

			return localPath;
		}
		#endregion
	}
}
