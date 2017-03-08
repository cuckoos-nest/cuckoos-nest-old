using CukoosApi.Data.Entities;
using CukoosApi.Helpers;
using CukoosApi.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
	public class PhotoModel : IModel
	{
		#region Properties
		public int id { get; set; }

		public string title { get; set; }

		public CategoryModel Category { get; set; }

		public string image { get; set; }
		#endregion

		#region Consturctors
		public PhotoModel()
		{
		}

		public PhotoModel(PhotoEntity entity)
		{
			this.id = entity.Id;
			this.title = entity.Title;
			this.Category = new CategoryModel(entity.Category);
			this.image = AssetsHelper.Get(Enums.AssetType.Photo, this.id);
		}

		public PhotoEntity ToEntity()
		{
			return new PhotoEntity()
			{
				Id = this.id,
				Title = this.title,
				Category = this.Category.ToEntity(),
				CategoryId = this.Category.id,
			};
		}
		#endregion
	}
}