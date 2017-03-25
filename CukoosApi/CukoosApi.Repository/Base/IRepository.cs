using CukoosApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Repository.Base
{
	public interface IRepository<TEntity> : IRepository
		  where TEntity : class, IEntity
	{
		TEntity Get(int id);
		IEnumerable<TEntity> All();
		IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
		bool Any(Expression<Func<TEntity, bool>> predicate);

		TEntity Add(TEntity entity);
		void AddRange(IEnumerable<TEntity> entities);

		void Remove(TEntity entity);
		void RemoveRange(IEnumerable<TEntity> entities);

	}

	public interface IRepository : IDisposable
	{
		DbContext Context { get; set; }

		bool Any(int id);
	}
}
