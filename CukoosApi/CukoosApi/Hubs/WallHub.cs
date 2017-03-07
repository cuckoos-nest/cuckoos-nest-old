using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace CukoosApi.Hubs
{
	[HubName("wall")]
	public class WallHub : Hub
	{
	}
}