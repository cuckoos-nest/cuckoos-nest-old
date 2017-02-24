using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;
using CukoosApi.Data.Interfaces;

namespace CukoosApi.Repository.Base
{
  public abstract class BaseRepository<T> : IRepository<T> where T : class, IEntity
  {
    protected readonly DbContext Context;
    private DbSet<T> _dbSet;

    public BaseRepository(DbContext context)
    {
      this.Context = context;
      this._dbSet = this.Context.Set<T>();
    }
    public void Add(T entity)
    {
      this._dbSet.Add(entity);
    }

    public void AddRange(IEnumerable<T> entities)
    {
      this._dbSet.AddRange(entities);
    }

    public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
    {
      return this._dbSet.Where(predicate);
    }

    public IEnumerable<T> GetAll()
    {
      return this._dbSet.ToList<T>();
    }

    public T GetById(int id)
    {
      return this._dbSet.Single(entity => entity.ID == id);
    }

    public void Remove(T entity)
    {
      this._dbSet.Remove(entity);
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
      this._dbSet.RemoveRange(entities);
    }


    public void Dispose()
    {
      this.Context.Dispose();
    }
  }
}
