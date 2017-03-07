using CukoosApi.Data.Interfaces;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CukoosApi.Controllers.Base
{
	public abstract class ApiControllerWithHub<THub> : ApiController
		where THub : IHub
	{
		private Lazy<IHubContext> hub = new Lazy<IHubContext>(
			() => GlobalHost.ConnectionManager.GetHubContext<THub>()
		);

		protected IHubContext Hub
		{
			get { return hub.Value; }
		}

		protected void PublishResponse<T>(string group, WebSocketResponse<T> response)
			where T : IEntity
		{
			Hub.Clients.Group(group).onResponse(response);
		}
	}

	public class WebSocketResponse<T>
		where T : IEntity
	{
		public T Entity { get; set; }
		public WebSocketResponseType ResponseType { get; set; }

		public WebSocketResponse()
		{
		}

		public WebSocketResponse(T entity, WebSocketResponseType responseType)
		{
			Entity = entity;
			ResponseType = responseType;
		}
	}

	public enum WebSocketResponseType
	{
		Add,
		Delete,
		Modify
	}
}
