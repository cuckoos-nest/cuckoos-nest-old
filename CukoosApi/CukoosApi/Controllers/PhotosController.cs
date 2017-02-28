using CukoosApi.Controllers.Base;
using CukoosApi.Data;
using CukoosApi.Data.Models;
using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
	public class PhotosController : BaseApiController
	{
		#region Get
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhotos()
		{
			return Ok(__db.Photos.Include(p => p.Category).ToList().Select(x => new PhotoModel(x)));
		}

		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhoto(int id)
		{
			Photo entity = __db.Photos.Include(p => p.Category).SingleOrDefault(p => p.Id == id);

			if (entity == null)
				return NotFound();

			return Ok(new PhotoModel(entity));
		}

		public IHttpActionResult GetPhotos(int category)
		{
			return Ok(__db.Photos.Where(x => x.Category.Id == category).ToList().Select(x => new PhotoModel(x)));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutPhoto(int id, PhotoModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (model.id != id)
				return BadRequest();

			var entity = model.ToEntity();

			__db.Entry(entity).State = EntityState.Modified;

			try
			{
				__db.SaveChanges();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!PhotoExists(id))
					return NotFound();
				else
					throw;
			}

			return StatusCode(HttpStatusCode.OK);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostPhoto(PhotoModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var entity = model.ToEntity();

			__db.Photos.Add(entity);
			__db.SaveChanges();

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion

		#region Delete
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult DeletePhoto(int id)
		{
			Photo model = __db.Photos.Find(id);

			if (model == null)
				return NotFound();

			__db.Photos.Remove(model);
			__db.SaveChanges();

			return Ok(new PhotoModel(model));
		}
		#endregion

		#region Private Method
		private bool PhotoExists(int id)
		{
			return __db.Photos.Any(e => e.Id == id);
		}
		#endregion
	}
}
