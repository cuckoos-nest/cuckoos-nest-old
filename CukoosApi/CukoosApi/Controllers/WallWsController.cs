using CukoosApi.Controllers.Base;
using CukoosApi.Data.Entities;
using CukoosApi.Hubs;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebSockets;

namespace CukoosApi.Controllers
{
	public class WallWsController : ApiControllerWithHub<WallHub>
	{
		public IHttpActionResult Post()
		{
			var response = new UploadEntity();
			PublishResponse("wall-listeners", new WebSocketResponse<UploadEntity>(response, WebSocketResponseType.Add));
			return Ok();
		}
	}
}
