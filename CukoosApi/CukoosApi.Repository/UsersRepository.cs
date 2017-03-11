using CukoosApi.Data.Entities;
using CukoosApi.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Repository
{
	public class UsersRepository : BaseRepository<UserEntity>
	{
		public UserEntity GetByFbId(long fb_id)
		{
			return FirstOrDefault(x => x.FacebookId == fb_id);
		}
	}
}
