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
		public virtual DbSet<UserUploadEntity> Uploads { get; set; }
		public virtual DbSet<NotificationEntity> Notifications { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<UserEntity>()
			.HasMany(a => a.UsersImFollowing)
			.WithMany(p => p.UsersFollowMe)
			.Map(x =>
			{
				x.MapLeftKey("follower");
				x.MapRightKey("user");
				x.ToTable("UserFollowsUsers");
			});

			modelBuilder.Entity<UserEntity>()
			.HasMany(a => a.CategoriesImFollowing)
			.WithMany(p => p.UsersFollowMe)
			.Map(x =>
			{
				x.MapLeftKey("user");
				x.MapRightKey("category");
				x.ToTable("UserFollowsCategories");
			});

			base.OnModelCreating(modelBuilder);
		}
	}
}
