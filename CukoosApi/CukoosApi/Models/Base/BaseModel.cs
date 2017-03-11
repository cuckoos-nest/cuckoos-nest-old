using CukoosApi.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Data.Interfaces;

namespace CukoosApi.Models.Base
{
	public abstract class BaseModel<TEntity> : IModel
		where TEntity : IEntity
	{
		#region Properties
		public int id { get; set; }
		#endregion

		#region Constructor
		public BaseModel()
		{
		}

		public BaseModel(TEntity entity)
		{
			this.FromEntity(entity);
		}
		#endregion

		#region Methods
		public IEntity ToIEntity()
		{
			return ToEntity();
		}

		public void FromIEntity(IEntity entity)
		{
			if (entity.GetType() != typeof(TEntity))
			{
				throw new ArgumentException("FromIEntity's argument must be of type " + typeof(TEntity).FullName, "entity");
			}

			FromEntity((TEntity)entity);
		}
		#endregion

		#region Abstract Methods
		public abstract TEntity ToEntity();
		public abstract void FromEntity(TEntity entity);
		#endregion
	}
}