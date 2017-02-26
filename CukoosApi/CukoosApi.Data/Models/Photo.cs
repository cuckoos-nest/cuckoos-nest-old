using CukoosApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
  [Table("Photos")]
  public class Photo : IEntity
  {
    [Column("id")]
    [Required]
    public int Id { get; set; }

    [Column("title")]
    [Required]
    public string Title { get; set; }

    [Column("category")]
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; }
    public virtual ICollection<Upload> Uploads { get; set; }
  }
}
