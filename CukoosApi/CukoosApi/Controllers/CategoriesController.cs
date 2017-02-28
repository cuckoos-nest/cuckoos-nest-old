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
	public class CategoriesController : BaseApiController
	{
		#region Get
		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategories()
		{
			return Ok(__db.Categories.ToList().Select(x => new CategoryModel(x)));
		}

		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategory(int id)
		{
			Category category = __db.Categories.Find(id);

			if (category == null)
				return NotFound();

			return Ok(new CategoryModel(category));
		}

		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategories(int followedBy)
		{
			User follower = __db.Users.Include(u => u.Categories).SingleOrDefault(x => x.Id == followedBy);

			if (follower == null)
				return NotFound();

			return Ok(follower.Categories.ToList().Select(x => new CategoryModel(x)));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutCategory(int id, CategoryModel categoryModel)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (categoryModel.id != id)
				return BadRequest();

			Category entity = categoryModel.ToEntity();

			__db.Entry(entity).State = EntityState.Modified;

			try
			{
				__db.SaveChanges();
			}

			catch (DbUpdateConcurrencyException)
			{
				if (!CategoryExists(id))
					return NotFound();
				else
					throw;
			}

			return StatusCode(HttpStatusCode.OK);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostCategory(CategoryModel categoryModel)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			Category entity = categoryModel.ToEntity();

			__db.Categories.Add(entity);
			__db.SaveChanges();

			return CreatedAtRoute("CukoosApi", new { id = categoryModel.id }, categoryModel);
		}
		#endregion

		#region Delete
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult DeleteCategory(int id)
		{
			Category entity = __db.Categories.Find(id);

			if (entity == null)
				return NotFound();

			__db.Categories.Remove(entity);
			__db.SaveChanges();

			return Ok(new CategoryModel(entity));
		}
		#endregion

		#region Private Methods
		private bool CategoryExists(int id)
		{
			return __db.Categories.Any(e => e.Id == id);
		}
		#endregion
	}
}
