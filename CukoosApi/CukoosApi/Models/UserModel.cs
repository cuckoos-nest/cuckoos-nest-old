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
	public class UserModel : BaseModel<UserEntity>, IModelWithImage
	{
		#region Properties
		public long fb_id { get; set; }
		public string email { get; set; }
		public string displayName { get; set; }
		public string image { get; set; }
		public int[] categoriesImFollowing { get; set; }
		public int[] usersImFollowing { get; set; }
		public int numberOfFollowers { get; set; }
		public int numberOfFollowing { get; set; }
		public int numberOfUploads { get; set; }

		public AssetType imageType
		{
			get
			{
				return AssetType.UserImage;
			}
		}
		#endregion

		#region Constructor
		public UserModel()
			: base()
		{
		}

		public UserModel(UserEntity entity)
			: base(entity)
		{
		}
		#endregion

		#region Methods
		public override void FromEntity(UserEntity entity)
		{
			this.id = entity.Id;
			this.fb_id = entity.FacebookId;
			this.email = entity.Email;
			this.displayName = entity.DisplayName;
			this.image = AssetsHelper.Get(Enums.AssetType.UserImage, this.id);
			this.categoriesImFollowing = entity.CategoriesImFollowing.Select(x => x.Id).ToArray();
			this.usersImFollowing = entity.UsersImFollowing.Select(x => x.Id).ToArray();
			this.numberOfFollowers = entity.UsersFollowMe.Count;
			this.numberOfFollowing = entity.UsersImFollowing.Count;
			this.numberOfUploads = entity.Uploads.Count;
		}

		public override UserEntity ToEntity()
		{
			return new UserEntity()
			{
				Id = this.id,
				FacebookId = this.fb_id,
				Email = this.email,
				DisplayName = this.displayName,
			};
		}
		#endregion
	}
}