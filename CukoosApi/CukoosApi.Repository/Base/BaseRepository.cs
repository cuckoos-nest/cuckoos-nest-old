using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;
using CukoosApi.Data.Interfaces;
using CukoosApi.Repository.Helpers;

namespace CukoosApi.Repository.Base
{
	public abstract class BaseRepository<TEntity> : IRepository<TEntity>
		where TEntity : class, IEntity
	{
		private DbSet<TEntity> _dbSet;

		private DbContext _context;
		public DbContext Context
		{
			get
			{
				throw new NotImplementedException();
			}

			set
			{
				this._context = value;
				this._dbSet = this._context.Set<TEntity>();
			}
		}

		public virtual TEntity Add(TEntity entity)
		{
			return this._dbSet.Add(entity);
		}

		public virtual void AddRange(IEnumerable<TEntity> entities)
		{
			this._dbSet.AddRange(entities);
		}

		public virtual IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbSet.Where(predicate);
		}

		public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbSet.FirstOrDefault(predicate);
		}

		public virtual TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbSet.SingleOrDefault(predicate);
		}

		public virtual TEntity Single(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbSet.Single(predicate);
		}

		public virtual TEntity First(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbSet.First(predicate);
		}

		public virtual IEnumerable<TEntity> All()
		{
			return this._dbSet.ToList<TEntity>();
		}

		public virtual TEntity Get(int id)
		{
			return this._dbSet.SingleOrDefault(entity => entity.Id == id);
		}

		public virtual void Remove(TEntity entity)
		{
			this._dbSet.Remove(entity);
		}

		public virtual void RemoveRange(IEnumerable<TEntity> entities)
		{
			this._dbSet.RemoveRange(entities);
		}

		public virtual bool Any(int id)
		{
			return _dbSet.Any(x => x.Id == id);
		}

		public virtual bool Any(Expression<Func<TEntity, bool>> predicate)
		{
			return _dbSet.Any(predicate);
		}

		public virtual void Dispose()
		{
			//this._context.Dispose();
		}

		protected T Repository<T>()
			where T : IRepository
		{
			T repository = RepositoriesManager.GetInstance<T>();
			repository.Context = this.Context;

			return repository;
		}
	}
}
