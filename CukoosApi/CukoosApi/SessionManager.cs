using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Hubs;
using CukoosApi.Models.Base;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi
{
	public static class SessionManager
	{
		#region Properties
		public static UserEntity CurrentUser { get; set; }

		public static IHubContext Hub
		{
			get
			{
				return new Lazy<IHubContext>(() => GlobalHost.ConnectionManager.GetHubContext<MainHub>()).Value;
			}
		}
		#endregion

		#region Constructor
		static SessionManager()
		{
			// Should be changed to the user who is currently connected to the server
			using (CukoosContext db = new CukoosContext())
			{
				CurrentUser = db.Users.Find(52);
			}
		}
		#endregion

		#region Public Methods
		private static List<ConnectionEntry> _connections = new List<ConnectionEntry>();

		public static void PublishResponseToAll<TModel>(string method, WebSocketResponse<TModel> response)
			where TModel : IModel
		{
			InvokeSocketMethod(Hub.Clients.All, method, response);
		}

		public static void PublishResponseToGroup<TModel>(string method, WebSocketResponse<TModel> response, string group)
			where TModel : IModel
		{
			InvokeSocketMethod(Hub.Clients.Group(group), method, response);
		}

		public static void PublishResponseToUser<TModel>(string method, WebSocketResponse<TModel> response, int userId)
			where TModel : IModel
		{
			ConnectionEntry connection = _connections.SingleOrDefault(x => x.UserId == userId);

			if (connection == null)
				throw new Exception("An attempt was made to publish a message to a user that is not connected. Use SessionManager.IsConnected method first.");

			InvokeSocketMethod(Hub.Clients.Client(connection.ConnectionId), method, response);
		}

		public static void AddConnection(string connectionId)
		{
			ConnectionEntry existingConnection = _connections.SingleOrDefault(x => x.ConnectionId == connectionId);
			if (existingConnection != null)
				existingConnection.UserId = SessionManager.CurrentUser.Id;
			else {
				_connections.Add(new ConnectionEntry()
				{
					ConnectionId = connectionId,
					UserId = SessionManager.CurrentUser.Id
				});
			}
		}

		public static void RemoveConnection(string connectionId)
		{
			_connections.RemoveAll(x => x.ConnectionId == connectionId);
		}

		public static bool IsConnected(int userId)
		{
			return _connections.Any(x => x.UserId == userId);
		}
		#endregion

		#region Private Methods
		private static void InvokeSocketMethod(dynamic socket, string method, object argument)
		{
			socket.Invoke(method, new object[] { argument });
		}
		#endregion

		#region Nested Classes
		class ConnectionEntry
		{
			public int UserId { get; set; }
			public string ConnectionId { get; set; }
		}
		#endregion
	}
}