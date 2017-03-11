using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Data.Interfaces;
using CukoosApi.Models.Base;
using CukoosApi.Repository.Base;
using CukoosApi.Repository.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;
using CukoosApi.Models.Base;
using CukoosApi.Helpers;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

namespace CukoosApi.Controllers.Base
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public abstract class BaseApiController : ApiController
    {
		#region Fields
		protected CukoosContext __db = new CukoosContext();

		protected UserEntity __currentUser;
		#endregion

		#region Methods
		protected override void Dispose(bool disposing)
		{
			__db.Dispose();
			RepositoriesManager.CleanUp();
			base.Dispose(disposing);
		}

		protected override void Initialize(HttpControllerContext controllerContext)
		{
			// Should be changed to the user who is currently connected to the server
			__currentUser = __db.Users.Find(52);  //10212332407968908

			base.Initialize(controllerContext);
		}

		protected T Repository<T>()
			where T : IRepository
		{
			T repository = RepositoriesManager.GetInstance<T>();
			repository.Context = __db;

			return repository;
		}

		protected IHttpActionResult HandlePost<TEntity>(IModel model)
			where TEntity : class, IEntity
		{

			TEntity entity = (TEntity)model.ToIEntity();

			__db.Set<TEntity>().Add(entity);

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			__db.SaveChanges();

			if (model is IModelWithImage)
				AssetsHelper.Save(((IModelWithImage)model).imageType, entity.Id, ((IModelWithImage)model).image);

			model.FromIEntity(__db.Set<TEntity>().Single(x => x.Id == entity.Id));

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}

		protected IHttpActionResult HandlePut(IModel model)
		{
			IEntity entity = model.ToIEntity();

			__db.Entry(entity).State = EntityState.Modified;

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			__db.SaveChanges();

			if (model is IModelWithImage)
				AssetsHelper.Save(((IModelWithImage)model).imageType, entity.Id, ((IModelWithImage)model).image);

			return StatusCode(HttpStatusCode.OK);
		}
		#endregion
	}

	public abstract class BaseApiController<TRepository, TEntity> : BaseApiController
		where TRepository : IRepository<TEntity>
		where TEntity : class, IEntity
	{
		protected TRepository Repository()
		{
			return Repository<TRepository>();
		}

		protected IHttpActionResult HandlePost(IModel model)
		{
			return HandlePost<TEntity>(model);
		}

		protected IHttpActionResult HandleDelete(int id)
		{
			TEntity entity = Repository().Get(id);

			if (entity == null)
				return NotFound();

			Repository().Remove(entity);
			__db.SaveChanges();

			return Ok();
		}
	}
}
