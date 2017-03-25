using CukoosApi.Controllers.Base;
using CukoosApi.Data.Entities;
using CukoosApi.Helpers;
using CukoosApi.Hubs;
using CukoosApi.Models;
using CukoosApi.Repository;
using System.Data.Entity;
using System.Linq;
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
			UserEntity user = Repository().Get(userId);
			if (user == null)
				return NotFound();

			SessionManager.CurrentUser.UsersImFollowing.Add(user);

			__db.Entry(SessionManager.CurrentUser).State = EntityState.Modified;

			__db.SaveChanges();

			WebSocketInterface.Notify(new NotificationEntity()
			{
				Type = Data.Enums.NotificationType.FollowingYou,
				SentByUser = SessionManager.CurrentUser,
				ReceivingUserId = userId
			});

			return Ok();
		}

		[Route("api/users/unfollow")]
		public IHttpActionResult DeleteFollow(int userId)
		{
			UserEntity user = Repository().Get(userId);
			if (user == null)
				return NotFound();

			SessionManager.CurrentUser.UsersImFollowing.Remove(user);

			__db.Entry(SessionManager.CurrentUser).State = EntityState.Modified;

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
