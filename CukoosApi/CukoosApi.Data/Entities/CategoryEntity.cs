using CukoosApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Entities
{
	[Table("Categories")]
	public class CategoryEntity : IEntity
	{
		[Column("id")]
		[Key()]
		[Required]
		public int Id { get; set; }

		[Column("name")]
		[Required]
		public string Name { get; set; }

		public virtual ICollection<UserEntity> UsersFollowMe { get; set; }

		public virtual ICollection<PhotoEntity> Photos { get; set; }
	}
}
