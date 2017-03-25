using CukoosApi.Controllers.Base;
using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
    public class LikesController : BaseApiController
	{
		#region Post
		public IHttpActionResult PostLike(int userUploadId)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			UserUploadEntity userUpload = Repository<UserUploadRepository>().Get(userUploadId);
			if (userUpload == null)
				return NotFound();

			if (userUpload.Likes.Any(x => x.UserId == UserManager.CurrentUser.Id))
				return BadRequest("User already likes this upload");

			userUpload.Likes.Add(new LikeEntity()
			{
				UserId = UserManager.CurrentUser.Id
			});

			__db.SaveChanges();

			return Ok();
		}
		#endregion

		#region Delete
		public IHttpActionResult DeleteLike(int userUploadId)
		{
			UserUploadEntity userUpload = Repository<UserUploadRepository>().Get(userUploadId);

			if (userUpload == null)
				return NotFound();

			LikeEntity like = userUpload.Likes.SingleOrDefault(x => x.UserId == UserManager.CurrentUser.Id);

			if (userUpload.Likes.Any(x => x.UserId == UserManager.CurrentUser.Id) == false)
				return BadRequest("User does not like this upload");

			userUpload.Likes.Remove(like);

			__db.Entry(like).State = EntityState.Deleted;

			__db.SaveChanges();

			return Ok();
		}
		#endregion
	}
}
