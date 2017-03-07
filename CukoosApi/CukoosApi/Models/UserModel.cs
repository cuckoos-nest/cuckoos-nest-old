using CukoosApi.Data.Entities;
using CukoosApi.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
	public class UserModel : IModel
	{
		#region Properties
		public int id { get; set; }
		public long fb_id { get; set; }
		public string email { get; set; }
		public string displayName { get; set; }
		public string imageUrl { get; set; }
		#endregion

		#region Consturctors
		public UserModel()
		{
		}

		public UserModel(UserEntity entity)
		{
			this.id = entity.Id;
			this.fb_id = entity.FacebookId;
			this.email = entity.Email;
			this.displayName = entity.DisplayName;
			this.imageUrl =  $"http://cukooapi.azurewebsites.net/assets/userImages/{this.id}.png";
		}

		public UserEntity ToEntity()
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