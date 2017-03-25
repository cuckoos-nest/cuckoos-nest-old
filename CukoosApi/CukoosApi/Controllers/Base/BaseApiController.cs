using CukoosApi.Data;
using CukoosApi.Data.Interfaces;
using CukoosApi.Models.Base;
using CukoosApi.Repository.Base;
using CukoosApi.Repository.Helpers;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using CukoosApi.Helpers;
using System.Data.Entity;

namespace CukoosApi.Controllers.Base
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public abstract class BaseApiController : ApiController
    {
		#region Fields
		protected CukoosContext __db = new CukoosContext();
		#endregion

		#region Methods
		protected override void Dispose(bool disposing)
		{
			__db.Dispose();
			RepositoriesManager.CleanUp();
			base.Dispose(disposing);
		}

		protected T Repository<T>()
			where T : IRepository
		{
			T repository = RepositoriesManager.GetInstance<T>(__db);	
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
