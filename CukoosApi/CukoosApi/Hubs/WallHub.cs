using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Hubs
{
	public class WallHub : Hub
	{
		public void Subscribe(string customerId)
		{
			Groups.Add(Context.ConnectionId, customerId);
		}

		public void Unsubscribe(string customerId)
		{
			Groups.Remove(Context.ConnectionId, customerId);
		}
	}
}