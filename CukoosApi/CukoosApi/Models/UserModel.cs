﻿using CukoosApi.Data.Models;
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
        public long fb_id { get; set; }
        public IEnumerable<PhotoModel> followingPhotos { get; set; }
        public IEnumerable<CategoryModel> followingCategories { get; set; }
        #endregion

        #region Consturctors
        public UserModel()
        {
        }

        public UserModel(User entity)
        {
            this.id = entity.Id;
            this.fb_id = entity.FacebookId;
        }

        public User ToEntity()
        {
            return new User()
            {
                Id = this.id,
                FacebookId = this.fb_id,
            };
        }
        #endregion
    }
}