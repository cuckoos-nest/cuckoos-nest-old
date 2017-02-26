using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
  [Table("UserUploads")]
  public class Upload
  {
    [Key]
    [Column("id")]
    [Required]
    public int Id { get; set; }

    [Column("user")]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    [Required]
    public virtual User User { get; set; }

    [Column("photo")]
    public int PhotoId { get; set; }

    [ForeignKey("PhotoId")]
    [Required]
    public virtual Photo Photo { get; set; }

    [Column("description")]
    [Required]
    public string Description { get; set; }

    [Column("dateTime")]
    [Required]
    public DateTime DateCreated { get; set; }

    public virtual ICollection<Comment> Comments { get; set; }

    public virtual ICollection<Like> Likes { get; set; }
  }
}
