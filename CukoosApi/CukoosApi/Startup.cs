using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Cors;
using Microsoft.Owin.Cors;

[assembly: OwinStartup(typeof(CukoosApi.Startup))]

namespace CukoosApi
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var corsPolicy = new CorsPolicy
			{
				AllowAnyMethod = true,
				AllowAnyHeader = true,
				AllowAnyOrigin = true
			};

			app.UseCors(new CorsOptions()
			{
				PolicyProvider = new CorsPolicyProvider
				{
					PolicyResolver = context => Task.FromResult(corsPolicy)
				}
			});

			// Any connection or hub wire up and configuration should go here
			app.MapSignalR();
		}
	}
}
