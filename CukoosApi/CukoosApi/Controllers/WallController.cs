﻿using CukoosApi.Controllers.Base;
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
	public class WallController : BaseApiController
	{
		#region Get
		[ResponseType(typeof(UserUploadModel))]
		public IHttpActionResult GetWall(int userId)
		{
			User userEntity = __db.Users.Find(userId);

			if (userEntity == null)
				return NotFound();

			IEnumerable<Upload> wall = userEntity.Categories.SelectMany(x => x.Photos).SelectMany(x => x.Uploads);

			return Ok(wall.ToList().Select(x => new UserUploadModel(x)));

		}
		#endregion
	}
}
