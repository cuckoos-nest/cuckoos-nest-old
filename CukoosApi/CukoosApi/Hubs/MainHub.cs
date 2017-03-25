using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace CukoosApi.Hubs
{
	[HubName("mainHub")]
	public class MainHub : Hub
	{

		public override Task OnConnected()
		{
			SessionManager.AddConnection(Context.ConnectionId);
			return base.OnConnected();
		}

		public override Task OnReconnected()
		{
			SessionManager.RemoveConnection(Context.ConnectionId);
			return base.OnReconnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			SessionManager.RemoveConnection(Context.ConnectionId);
			return base.OnDisconnected(stopCalled);
		}
	}
}