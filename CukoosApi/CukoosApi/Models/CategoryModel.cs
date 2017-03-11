using CukoosApi.Data.Entities;
using CukoosApi.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Models.Base;
using CukoosApi.Data.Interfaces;

namespace CukoosApi.Models
{
	public class CategoryModel : BaseModel<CategoryEntity>
	{
		#region Properties
		public string name { get; set; }
		#endregion

		#region Constructor
		public CategoryModel()
			: base()
		{
		}

		public CategoryModel(CategoryEntity entity)
			: base(entity)
		{
		}
		#endregion

		#region Methods
		public override void FromEntity(CategoryEntity entity)
		{
			this.id = entity.Id;
			this.name = entity.Name;
		}

		public override CategoryEntity ToEntity()
		{
			return new CategoryEntity
			{
				Id = this.id,
				Name = this.name
			};
		}
		#endregion
	}
}