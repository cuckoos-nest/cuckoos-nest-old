using CukoosApi.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using CukoosApi.Repository.Base;
using CukoosApi.Data;

namespace CukoosApi.Repository.Repositories
{
	public class UserUploadRepository : BaseRepository<UserUploadEntity>
	{
		public IEnumerable<UserUploadEntity> GetWallFor(UserEntity user)
		{
			IEnumerable<UserUploadEntity> wall = user.UsersImFollowing.SelectMany(x => x.Uploads);

			wall = wall.Union(user.CategoriesImFollowing.SelectMany(x => x.Photos).SelectMany(x => x.UserUploads));

			wall = wall.Union(user.Uploads);

			wall = wall.OrderByDescending(x => x.Id);

			return wall;
		}
	}
}
