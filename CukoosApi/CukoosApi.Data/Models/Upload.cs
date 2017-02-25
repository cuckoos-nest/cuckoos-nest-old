using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
  public class Upload
  {
    [Key]
    [Column("id")]
    [Required]
    public int Id { get; set; }

    [ForeignKey("Id")]
    [Required]
    public virtual User User { get; set; }

    [ForeignKey("Id")]
    [Required]
    public virtual Photo Photo { get; set; }

    [Column("description")]
    [Required]
    public string Description { get; set; }

    [Column("dateTime")]
    [Required]
    public DateTime DateCreated { get; set; }

    public virtual ICollection<Comment> Comments { get; set; }
  }
}
