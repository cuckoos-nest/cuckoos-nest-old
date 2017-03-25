using CukoosApi.Controllers.Base;
using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Models;
using CukoosApi.Repository;
using CukoosApi.Repository.Repositories;
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
	public class CategoriesController : BaseApiController<CategoriesRepository, CategoryEntity>
	{
		#region Get
		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategories()
		{
			return Ok(Repository().All().ToList().Select(x => new CategoryModel(x)));
		}

		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategory(int id)
		{
			CategoryEntity category = Repository().Get(id);

			if (category == null)
				return NotFound();

			return Ok(new CategoryModel(category));
		}

		[ResponseType(typeof(CategoryModel))]
		public IHttpActionResult GetCategories(int followedBy)
		{
			UserEntity follower = Repository<UsersRepository>().Get(followedBy);

			if (follower == null)
				return NotFound();

			return Ok(follower.CategoriesImFollowing.ToList().Select(x => new CategoryModel(x)));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutCategory(CategoryModel model)
		{
			return HandlePut(model);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostCategory(CategoryModel categoryModel)
		{
			return HandlePost(categoryModel);
		}

		[Route("api/categories/follow")]
		public IHttpActionResult PostFollow(int categoryId)
		{
			CategoryEntity category = Repository().Get(categoryId);
			if (category == null)
				return NotFound();

			SessionManager.CurrentUser.CategoriesImFollowing.Add(category);

			__db.Entry(SessionManager.CurrentUser).State = EntityState.Modified;

			__db.SaveChanges();

			return Ok();
		}

		[Route("api/categories/unfollow")]
		public IHttpActionResult DeleteFollow(int categoryId)
		{
			CategoryEntity category = Repository().Get(categoryId);
			if (category == null)
				return NotFound();

			SessionManager.CurrentUser.CategoriesImFollowing.Remove(category);

			__db.Entry(SessionManager.CurrentUser).State = EntityState.Modified;

			__db.SaveChanges();

			return Ok();
		}
		#endregion

		#region Delete
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult DeleteCategory(int id)
		{
			return HandleDelete(id);
		}
		#endregion
	}
}
