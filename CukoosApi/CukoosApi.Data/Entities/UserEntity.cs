using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Entities
{
	[Table("Users")]
	public class UserEntity
	{
		[Key]
		[Column("id")]
		[Required]
		public int Id { get; set; }

		[Column("fb_id")]
		public long FacebookId { get; set; }

		public virtual ICollection<CategoryEntity> Categories { get; set; }

		[InverseProperty("ReceivingUser")]
		public virtual ICollection<NotificationEntity> Notifications { get; set; }

		[Column("email")]
		[Required]
		public string Email { get; set; }

		[Column("displayName")]
		[Required]
		public string DisplayName { get; set; }
	}
}
