using CukoosApi.Data.Entities;
using CukoosApi.Helpers;
using CukoosApi.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Models.Base;
using CukoosApi.Enums;

namespace CukoosApi.Models
{
	public class PhotoModel : BaseModel<PhotoEntity>, IModelWithImage
	{
		#region Properties
		public string title { get; set; }

		public CategoryModel Category { get; set; }

		public string image { get; set; }

		public AssetType imageType
		{
			get
			{
				return AssetType.Photo;
			}
		}
		#endregion

		#region Constructor
		public PhotoModel()
			: base()
		{
		}

		public PhotoModel(PhotoEntity entity)
			: base(entity)
		{
		}
		#endregion

		#region Methods
		public override void FromEntity(PhotoEntity entity)
		{
			this.id = entity.Id;
			this.title = entity.Title;
			this.Category = new CategoryModel(entity.Category);
			this.image = AssetsHelper.Get(Enums.AssetType.Photo, this.id);
		}

		public override PhotoEntity ToEntity()
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