using CukoosApi.DataAnnotations;
using CukoosApi.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Hubs
{
	public class WebSocketResponse<T>
		where T : IModel
	{
		public T Entity { get; set; }
		public WebSocketResponseType ResponseType { get; set; }

		public WebSocketResponse()
		{
		}

		public WebSocketResponse(T entity)
		{
			Entity = entity;
			ResponseType = WebSocketResponseType.Add;
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