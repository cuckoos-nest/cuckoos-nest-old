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
	public class PhotosController : BaseApiController<PhotosRepository, PhotoEntity>
	{
		#region Get
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhotos()
		{
			return Ok(Repository().All().ToList().Select(x => new PhotoModel(x)));
		}

		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult GetPhoto(int id)
		{
			PhotoEntity entity = Repository().Get(id);

			if (entity == null)
				return NotFound();

			return Ok(new PhotoModel(entity));
		}

		public IHttpActionResult GetPhotos(int category)
		{
			return Ok(Repository<CategoriesRepository>().Get(category).Photos.ToList().Select(x => new PhotoModel(x)));
		}
		#endregion

		#region Put
		[ResponseType(typeof(void))]
		public IHttpActionResult PutPhoto(PhotoModel model)
		{
			return HandlePut(model);
		}
		#endregion

		#region Post
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult PostPhoto(PhotoModel model)
		{
			return HandlePost(model);
		}
		#endregion

		#region Delete
		[ResponseType(typeof(PhotoModel))]
		public IHttpActionResult DeletePhoto(int id)
		{
			return HandleDelete(id);
		}
		#endregion
	}
}
