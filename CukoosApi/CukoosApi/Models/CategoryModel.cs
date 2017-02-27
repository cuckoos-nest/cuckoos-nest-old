using CukoosApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
	public class CategoryModel
	{
		#region Properties
		public int id { get; set; }
		public string name { get; set; }
		#endregion

		#region Consturctors
		public CategoryModel()
		{
		}

		public CategoryModel(Category entity)
		{
			this.id = entity.Id;
			this.name = entity.Name;
		}

		public Category ToEntity()
		{
			return new Category
			{
				Id = this.id,
				Name = this.name
			};
		}
		#endregion
	}
}