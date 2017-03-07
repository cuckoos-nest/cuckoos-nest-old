using CukoosApi.Data.Entities;
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

		public string imageUrl
		{
			get
			{
				return $"http://cukooapi.azurewebsites.net/assets/photos/{this.id}.png";
			}
		}

		public CategoryModel Category { get; set; }
		#endregion

		#region Consturctors
		public PhotoModel()
		{
		}

		public PhotoModel(PhotoEntity entity)
		{
			this.id = entity.Id;
			this.title = entity.Title;

			if (entity.Category != null)
				this.Category = new CategoryModel(entity.Category);
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