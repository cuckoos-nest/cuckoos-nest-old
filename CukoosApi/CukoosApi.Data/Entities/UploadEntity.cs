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
	[Table("UserUploads")]
	public class UserUploadEntity : IEntity
	{
		[Key]
		[Column("id")]
		[Required]
		public int Id { get; set; }

		[Column("user")]
		public int UserId { get; set; }

		[ForeignKey("UserId")]
		[Required]
		public virtual UserEntity User { get; set; }

		[Column("photo")]
		public int PhotoId { get; set; }

		[ForeignKey("PhotoId")]
		[Required]
		public virtual PhotoEntity Photo { get; set; }

		[Column("description")]
		[Required]
		public string Description { get; set; }

		//[Column("dateTime")]
		//[Required]
		//public DateTime DateCreated { get; set; }
		
		[InverseProperty("Upload")]
		public virtual ICollection<LikeEntity> Likes { get; set; }
	}
}
