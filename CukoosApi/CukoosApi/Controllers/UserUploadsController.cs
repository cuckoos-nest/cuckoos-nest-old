using CukoosApi.Controllers.Base;
using CukoosApi.Data.Entities;
using CukoosApi.Helpers;
using CukoosApi.Hubs;
using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
	public class UserUploadsController : ApiControllerWithHub<WallHub>
	{
        #region Get
        public IHttpActionResult GetUserUploads()
        {
          return Ok(__db.Uploads.OrderByDescending(x => x.Id).ToList().Select(x => new UserUploadModel(x)));
        }
        public IHttpActionResult GetUserUploads(int from, int take)
		{
			return Ok(__db.Uploads.OrderByDescending(x => x.Id).Skip(from).Take(take).ToList().Select(x => new UserUploadModel(x)));
		}
        [Route("api/useruploads/popular/photos")]
        public IHttpActionResult GetMoustPopularPhotos()
        {
            return Ok(__db.Uploads.OrderByDescending(upload => upload.Likes.Count).ToList().Select(upload => new UserUploadModel(upload)));
        }
        [Route("api/useruploads/popular/photos/{photoId:int}/{from:int?}/{take:int?}")]
        public IHttpActionResult GetMoustPopularPhotosById(int photoId, int from = 0, int take = 0)
        {
            if (take == 0)
              return Ok(__db.Uploads.OrderByDescending(upload => upload.Likes.Count).Where(upload => upload.PhotoId == photoId).Skip(from).ToList().Select(upload => new UserUploadModel(upload)));
            else
              return Ok(__db.Uploads.OrderByDescending(upload => upload.Likes.Count).Where(upload => upload.PhotoId == photoId).Skip(from).Take(take).ToList().Select(upload => new UserUploadModel(upload)));
        }
    #endregion

    #region Post
    [ResponseType(typeof(UserUploadModel))]
		public IHttpActionResult PostUserUpload(UserUploadModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			model.user = new UserModel(this.__currentUser);

			var entity = model.ToEntity();
			entity.User = null;

			__db.Photos.Attach(entity.Photo);
			__db.Categories.Attach(entity.Photo.Category);

			__db.Uploads.Add(entity);
			__db.SaveChanges();

			AssetsHelper.Save(Enums.AssetType.UserUpload, entity.Id, model.image);

			model = new UserUploadModel(__db.Uploads.Find(entity.Id));

			PublishResponse(new WebSocketResponse<UserUploadModel>(model, WebSocketResponseType.Add));

			return CreatedAtRoute("CukoosApi", new { id = model.id }, model);
		}
		#endregion
	}
}
