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
      : base("data source=cukoos.database.windows.net;initial catalog=dev;persist security info=True;user id=cukoo;password=Aa123456;MultipleActiveResultSets=True;App=EntityFramework")
    {
      //var connStringBuilder = new CukoosConnectionStringBuilder("dev", "cukoos.database.windows.net", "cukoo", "Aa123456");
      //base.Database.Connection.ConnectionString = connStringBuilder.BuildConnectionString();
    }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Photo> Photos { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Upload> Uploads { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>()
      .HasMany(a => a.Categories)
      .WithMany(p => p.Users) // <-- I think this should fix it
      .Map(x =>
      {
        x.MapLeftKey("user"); // <-- Account.Id to AccountsToPersons.AccountId??
        x.MapRightKey("category"); // <-- Person.Id  to AccountsToPersons.PersonId??
        x.ToTable("UserCategories");
      });
      base.OnModelCreating(modelBuilder);
    }
  }
}
