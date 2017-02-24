using CukoosApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data
{
  public class CukoosContext : DbContext
  {
    public CukoosContext()
      : base("name=CukoosContext")
    {

    }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Photo> Photos { get; set; }

  }
}
