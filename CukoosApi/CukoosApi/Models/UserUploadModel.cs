using CukoosApi.Data.Entities;
using CukoosApi.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
	public class UserUploadModel : IModel
	{
		#region Properties
		public int id { get; set; }

		public PhotoModel photo { get; set; }

		public string imageUrl
		{
			get
			{
				return $"http://cukooapi.azurewebsites.net/assets/userUploads/{this.id}.png";
			}
		}

		public string imageBase64 { get; set; }

		public string description { get; set; }
			
		public UserModel user { get; set; }

		public int likeCount { get; set; }

		public bool isLiked { get; set; }

		public DateTime dateTime { get; set; }
		#endregion

		#region Consturctors
		public UserUploadModel()
		{
		}

		public UserUploadModel(UploadEntity entity)
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
			//this.dateTime = entity.DateCreated;
		}

		public UploadEntity ToEntity()
		{
			return new UploadEntity()
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