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
	[Table("UserUploadLikes")]
	public class LikeEntity : IEntity
	{
		[Key]
		[Column("id")]
		public int Id { get; set; }

		[Column("user")]
		public int UserId { get; set; }

		[ForeignKey("UserId")]
		public virtual UserEntity User { get; set; }

		[Column("userUpload")]
		public int UploadId { get; set; }

		[ForeignKey("UploadId")]
		public virtual UploadEntity Upload { get; set; }
	}
}
