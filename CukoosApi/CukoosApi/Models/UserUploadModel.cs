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
	public class UserUploadModel : BaseModel<UserUploadEntity>, IModelWithImage
	{
		#region Properties
		public PhotoModel photo { get; set; }

		public string image { get; set; }

		public string description { get; set; }
			
		public UserModel user { get; set; }

		public int likeCount { get; set; }

		public bool isLiked { get; set; }

		public DateTime dateTime { get; set; }

		public AssetType imageType
		{
			get
			{
				return AssetType.UserUpload;
			}
		}
		#endregion

		#region Constructor
		public UserUploadModel()
			: base()
		{
		}

		public UserUploadModel(UserUploadEntity entity)
			: base(entity)
		{
		}
		#endregion

		#region Methods
		public override void FromEntity(UserUploadEntity entity)
		{
			this.id = entity.Id;
			this.photo = new PhotoModel(entity.Photo);
			this.description = entity.Description;
			this.user = new UserModel(entity.User);
			if (entity.Likes != null)
			{
				this.likeCount = entity.Likes.Count;
				this.isLiked = entity.Likes.Any(x => x.UserId == 17);
			}
			this.image = AssetsHelper.Get(Enums.AssetType.UserUpload, this.id);
			//this.dateTime = entity.DateCreated;
		}

		public override UserUploadEntity ToEntity()
		{
			return new UserUploadEntity()
			{
				Id = this.id,
				Photo = this.photo.ToEntity(),
				PhotoId = this.photo.id,
				Description = this.description,
				User = this.user.ToEntity(),
				UserId = this.user.id,
				//DateCreated = dateTime,
			};
		}
		#endregion
	}
}