using CukoosApi.Data.Helpers;
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
      : base()
    {
      var connStringBuilder = new CukoosConnectionStringBuilder("dev", "cukoos.database.windows.net", "cukoo", "Aa123456");
      base.Database.Connection.ConnectionString = connStringBuilder.BuildConnectionString();
    }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Photo> Photos { get; set; }
    public virtual DbSet<User> Users { get; set; }
  }
}
