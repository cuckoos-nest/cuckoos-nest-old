using CukoosApi.Controllers.Base;
using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Helpers;
using CukoosApi.Models;
using CukoosApi.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
	public class UsersController : BaseApiController<UsersRepository, UserEntity>
	{
		#region Get
		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUsers()
		{
			return Ok(Repository().All().ToList().Select(x => new UserModel(x)));
		}

		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUser(int id)
		{
			UserEntity entity = Repository().Get(id);

			if (entity == null)
				return NotFound();

			return Ok(new UserModel(entity));
		}

		[ResponseType(typeof(UserModel))]
		public IHttpActionResult GetUsers(long fb_id)
		{
			UserEntity entity = Repository().GetByFbId(fb_id);

			if (entity == null)
				return NotFound();

			return Ok(new UserModel(entity));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutUser(UserModel model)
		{
			return HandlePut(model);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostUser([FromBody] UserModel model)
		{
			return HandlePost(model);
		}

		[Route("api/users/follow")]
		public IHttpActionResult PostFollow(int userId)
		{
			UserEntity user = __db.Users.Find(userId);
			if (user == null)
				return NotFound();

			this.__currentUser.UsersImFollowing.Add(user);

			__db.Entry(this.__currentUser).State = EntityState.Modified;

			__db.SaveChanges();

			return Ok();
		}

		[Route("api/users/unfollow")]
		public IHttpActionResult DeleteFollow(int userId)
		{
			UserEntity user = __db.Users.Find(userId);
			if (user == null)
				return NotFound();

			this.__currentUser.UsersImFollowing.Remove(user);

			__db.Entry(this.__currentUser).State = EntityState.Modified;

			__db.SaveChanges();

			return Ok();
		}

		#endregion

		#region Delete
		[ResponseType(typeof(UserModel))]
		public IHttpActionResult DeleteUser(int id)
		{
			return HandleDelete(id);
		}
		#endregion
	}
}
