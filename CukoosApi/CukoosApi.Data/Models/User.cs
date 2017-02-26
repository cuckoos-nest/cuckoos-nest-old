using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
  public class User
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("fb_id")]
    public long FacebookId { get; set; }

    public virtual ICollection<Upload> Uploads { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("displayName")]
    public string DisplayName { get; set; }
  }
}
