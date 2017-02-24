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
  [Table("Categories")]
  public class Category : IEntity
  {
    [Column("id")]
    [Required]
    public int ID { get; set; }

    [Column("name")]
    [Required]
    public string Name { get; set; }

    [Column("image")]
    public byte[] Image { get; set; }
  }
}
