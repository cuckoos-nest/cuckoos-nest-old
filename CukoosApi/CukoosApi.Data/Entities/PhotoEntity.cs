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
	[Table("Photos")]
	public class PhotoEntity : IEntity
	{
		[Key]
		[Column("id")]
		[Required]
		public int Id { get; set; }

		[Column("title")]
		[Required]
		public string Title { get; set; }

		[Column("category")]
		public int CategoryId { get; set; }

		[ForeignKey("CategoryId")]
		public virtual CategoryEntity Category { get; set; }
		public virtual ICollection<UploadEntity> Uploads { get; set; }
	}
}
