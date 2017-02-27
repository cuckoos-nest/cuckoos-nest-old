using CukoosApi.Data;
using CukoosApi.Data.Models;
using CukoosApi.Models;
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
	public class WallController : ApiController
	{
		private CukoosContext _db = new CukoosContext();

		#region Get
		[ResponseType(typeof(UserUploadModel))]
		public IHttpActionResult GetWall(int userId)
		{
			User user = _db.Users.Find(userId);

			if (user == null)
				return NotFound();

			IEnumerable<Upload> wall = user.Categories.SelectMany(x => x.Photos).SelectMany(x => x.Uploads);

			return Ok(wall.ToList().Select(x => new UserUploadModel(x)));

		}
		#endregion

		protected override void Dispose(bool disposing)
		{
			_db.Dispose();
			base.Dispose(disposing);
		}
	}
}
