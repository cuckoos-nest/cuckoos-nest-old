using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
    public class UserUploadModel
    {
        #region Properties
        public int id { get; set; }

        public PhotoModel photo { get; set; }

        public string imageUrl
        {
            get
            {
                return "";
            }
        }

        public string description { get; set; }

        public UserModel user { get; set; }
        #endregion

        #region Consturctors
        public UserUploadModel()
        {
        }

        public UserUploadModel(UserUpload entity)
        {
            this.id = entity.id;
            this.photo = new PhotoModel(entity.Photo1);
            this.description = entity.description;
            this.user = new UserModel(entity.User1);
        }

        public UserUpload ToEntity()
        {
            return new UserUpload()
            {
                id = this.id,
                photo = this.photo.id,
                description = this.description,
                user = this.user.id,
            };
        }
        #endregion
    }
}