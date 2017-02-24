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
    public int ID { get; set; }

    [Column("category")]
    [ForeignKey("category")]
    [Required]
    public int CategoryID { get; set; }

    [Column("title")]
    [Required]
    public string Title { get; set; }

    [Column("image")]
    public byte[] Image { get; set; }
  }
}
