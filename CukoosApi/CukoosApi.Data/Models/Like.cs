using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
  public class Like
  {
    [Key]
    [Column("id")]
    [Required]
    public int Id { get; set; }

    [ForeignKey("Id")]
    public virtual User User { get; set; }

    [ForeignKey("Id")]
    [Column("userUpload")]
    public virtual Upload Upload { get; set; }
  }
}
