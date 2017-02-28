using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Entities
{
	[Table("UserUploadsComments")]
	public class CommentEntity
	{
		[Key]
		[Column("id")]
		[Required]
		public int Id { get; set; }

		[Column("user")]
		public int UserId { get; set; }

		[ForeignKey("Id")]
		public virtual UserEntity User { get; set; }

		[Column("userUpload")]
		public int UploadId { get; set; }

		[ForeignKey("UploadId")]
		public virtual UploadEntity Upload { get; set; }

		[Column("content")]
		[Required]
		public string Content { get; set; }
	}
}