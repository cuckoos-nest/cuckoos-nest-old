using CukoosApi.Data;
using CukoosApi.Data.Entities;
using CukoosApi.Models;
using CukoosApi.Repository;
using CukoosApi.Repository.Helpers;
using System.Data.Entity;

namespace CukoosApi.Hubs
{
	public static class WebSocketInterface
	{
		public static void WallUpdate(UserUploadModel model, WebSocketResponseType type) =>
			SessionManager.PublishResponseToAll("onWallUpdate", new WebSocketResponse<UserUploadModel>(model, type));

		public static void Notify(NotificationEntity entity)
		{
			using (DbContext db = new CukoosContext())
			{
				RepositoriesManager.GetInstance<NotificationsRepository>().Add(entity);
				db.SaveChanges();
			}

			NotificationModel model = new NotificationModel(entity);
			if (SessionManager.IsConnected(model.recivingUserId))
			{
				SessionManager.PublishResponseToUser("onNotification", new WebSocketResponse<NotificationModel>(model, WebSocketResponseType.Add), SessionManager.CurrentUser.Id);
			}
		}
	}
}