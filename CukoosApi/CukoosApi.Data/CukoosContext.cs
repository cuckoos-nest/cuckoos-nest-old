using CukoosApi.Data.Helpers;
using CukoosApi.Data.Entities;
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

		public virtual DbSet<CategoryEntity> Categories { get; set; }
		public virtual DbSet<PhotoEntity> Photos { get; set; }
		public virtual DbSet<UserEntity> Users { get; set; }
		public virtual DbSet<UploadEntity> Uploads { get; set; }
		public virtual DbSet<NotificationEntity> Notifications { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<UserEntity>()
			.HasMany(a => a.Categories)
			.WithMany(p => p.Users)
			.Map(x =>
			{
				x.MapLeftKey("user");
				x.MapRightKey("category");
				x.ToTable("UserCategories");
			});

			base.OnModelCreating(modelBuilder);
		}
	}
}
