using CukoosApi.Data;
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
	public class PhotosController : ApiController
	{
		#region Get
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhotos()
		{
			using (var db = new CukoosContext())
			{
				return Ok(db.Photos.Include(p => p.Category).ToList().Select(x => new PhotoModel(x)));
			}
		}

		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhoto(int id)
		{
			using (var db = new CukoosContext())
			{
				var photo = db.Photos.Include(p => p.Category).SingleOrDefault(p => p.Id == id);

				if (photo == null)
					return NotFound();

				return Ok(new PhotoModel(photo));
			}
		}

		public IHttpActionResult GetPhotos(int category)
		{
			using (var db = new CukoosContext())
			{
				return Ok(db.Photos.Include(p => p.Category).Where(x => x.Category.Id == category).ToList().Select(x => new PhotoModel(x)));
			}
		}
		#endregion

		[ResponseType(typeof(void))]
		public IHttpActionResult PutPhoto(int id, PhotoModel photoModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (photoModel.id != id)
			{
				return BadRequest();
			}

			var entity = photoModel.ToEntity();

			using (var db = new CukoosContext())
			{
				db.Entry(entity).State = EntityState.Modified;

				try
				{
					db.SaveChanges();
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
		}

		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostPhoto(PhotoModel photoModel)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var entity = photoModel.ToEntity();

			using (var db = new CukoosContext())
			{
				db.Photos.Add(entity);
				db.SaveChanges();
			}

			return CreatedAtRoute("DefaultApi", new { id = photoModel.id }, photoModel);
		}

		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult DeletePhoto(int id)
		{
			using (var db = new CukoosContext())
			{
				var photo = db.Photos.Find(id);

				if (photo == null)
					return NotFound();

				db.Photos.Remove(photo);
				db.SaveChanges();

				return Ok(new PhotoModel(photo));
			}
		}

		private bool PhotoExists(int id)
		{
			using (var db = new CukoosContext())
			{
				return db.Photos.Count(e => e.Id == id) > 0;
			}
		}
	}
}
