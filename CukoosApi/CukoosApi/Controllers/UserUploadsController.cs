using CukoosApi.Controllers.Base;
using CukoosApi.Data.Entities;
using CukoosApi.Hubs;
using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
	public class UserUploadsController : ApiControllerWithHub<WallHub>
	{
		#region Get
		public IHttpActionResult GetUserUploads(int from, int take)
		{
			return Ok(__db.Uploads.OrderByDescending(x => x.Id).Skip(from).Take(take).ToList().Select(x => new UserUploadModel(x)));
		}
		#endregion

		#region Post
		[ResponseType(typeof(UserUploadModel))]
		public IHttpActionResult PostUserUpload(UserUploadModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			model.user = new UserModel(this.__currentUser);

			var entity = model.ToEntity();
			entity.User = null;

			__db.Photos.Attach(entity.Photo);
			__db.Categories.Attach(entity.Photo.Category);

			__db.Uploads.Add(entity);
			__db.SaveChanges();

			string localPath = HttpRuntime.AppDomainAppPath + $"assets/userUploads/{entity.Id}.png";
			byte[] imageBytes = Convert.FromBase64String(model.imageBase64.Trim('\0'));
			File.WriteAllBytes(localPath, imageBytes);

			model = new UserUploadModel(__db.Uploads.Find(entity.Id));

			PublishResponse(new WebSocketResponse<UserUploadModel>(model, WebSocketResponseType.Add));

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion
	}
}
