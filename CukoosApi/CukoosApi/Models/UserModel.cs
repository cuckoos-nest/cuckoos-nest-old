using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
    public class UserModel
    {
        #region Properties
        public int id { get; set; }
        public int fb_id { get; set; }
        public IEnumerable<PhotoModel> followingPhotos { get; set; }
        public IEnumerable<CategoryModel> followingCategories { get; set; }
        public IEnumerable<UserUploadModel> uploads { get; set; }
        #endregion

        #region Consturctors
        public UserModel()
        {
        }

        public UserModel(User entity)
        {
            this.id = entity.id;
            this.fb_id = entity.fb_id;
            this.followingPhotos = entity.Photos.ToList().Select(x => new PhotoModel(x));
            this.followingCategories = entity.Categories.ToList().Select(x => new CategoryModel(x));
            this.uploads = entity.UserUploads.ToList().Select(x => new UserUploadModel(x));
        }

        public User ToEntity()
        {
            return new User()
            {
                id = this.id,
                fb_id = this.fb_id,
                Photos = this.followingPhotos.Select(x => x.ToEntity()) as ICollection<Photo>,
                Categories = this.followingCategories.Select(x => x.ToEntity()) as ICollection<Category>,
                UserUploads = this.uploads.Select(x => x.ToEntity()) as ICollection<UserUpload>,
            };
        }
        #endregion
    }
}