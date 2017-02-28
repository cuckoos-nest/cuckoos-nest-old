﻿using CukoosApi.Data;
using CukoosApi.Data.Models;
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
    public class LikesController : ApiController
	{
		private CukoosContext _db = new CukoosContext();

		#region Post
		public IHttpActionResult PostLike(int userUploadId)
		{
			var userId = 17; // Should be changed to the user who is currently connected to the server

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			Upload userUpload = _db.Uploads.Find(userUploadId);
			if (userUpload == null)
				return NotFound();

			if (userUpload.Likes.Any(x => x.UserId == userId))
				return BadRequest("User already likes this upload");

			userUpload.Likes.Add(new Like()
			{
				UserId = userId
			});
			
			_db.SaveChanges();

			return Ok();
		}
		#endregion

		#region Delete
		public IHttpActionResult DeleteLike(int userUploadId)
		{
			var userId = 17; // Should be changed to the user who is currently connected to the server

			Upload userUpload = _db.Uploads.Find(userUploadId);

			if (userUpload == null)
				return NotFound();

			Like like = userUpload.Likes.SingleOrDefault(x => x.UserId == userId);

			if (userUpload.Likes.Any(x => x.UserId == userId) == false)
				return BadRequest("User does not like this upload");

			userUpload.Likes.Remove(like);

			_db.Entry(like).State = EntityState.Deleted;

			_db.SaveChanges();

			return Ok();
		}
		#endregion

		protected override void Dispose(bool disposing)
		{
			_db.Dispose();
			base.Dispose(disposing);
		}
	}
}
