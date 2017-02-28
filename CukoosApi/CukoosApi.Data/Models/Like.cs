using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
	[Table("UserUploadLikes")]
	public class Like
	{
		[Key]
		[Column("id")]
		public int Id { get; set; }

		[Column("user")]
		public int UserId { get; set; }

		[ForeignKey("UserId")]
		public virtual User User { get; set; }

		[Column("userUpload")]
		public int UploadId { get; set; }

		[ForeignKey("UploadId")]
		public virtual Upload Upload { get; set; }
	}
}
