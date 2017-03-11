using CukoosApi.Data.Interfaces;
using CukoosApi.Models.Base;
using CukoosApi.Repository.Base;
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
	public abstract class ApiControllerWithHub<THub> : BaseApiController
		where THub : IHub
	{
		private Lazy<IHubContext> hub = new Lazy<IHubContext>(
			() => GlobalHost.ConnectionManager.GetHubContext<THub>()
		);

		protected IHubContext Hub
		{
			get { return hub.Value; }
		}

		protected void PublishResponse<T>(WebSocketResponse<T> response)
			where T : IModel
		{
			Hub.Clients.All.onResponse(response);
		}

		protected void PublishResponse<T>(WebSocketResponse<T> response, string group)
			where T : IModel
		{
			Hub.Clients.Group(group).onResponse(response);
		}
	}

	public abstract class ApiControllerWithHub<THub, TRepository> : ApiControllerWithHub<THub>
		where THub : IHub
		where TRepository : IRepository
	{
		public TRepository Repository()
		{
			return Repository<TRepository>();
		}
	}

	public class WebSocketResponse<T>
		where T : IModel
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
