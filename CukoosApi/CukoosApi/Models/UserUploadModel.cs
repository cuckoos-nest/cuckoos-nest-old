﻿using CukoosApi.Data.Models;
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
                return $"http://cukooapi.azurewebsites.net/assets/userUploads/{this.id}.png";
            }
        }

        public string description { get; set; }

        public UserModel user { get; set; }
        
        public List<Comment> comments { get; set; }

        public List<Like> likes { get; set; }

        public DateTime dateTime { get; set; }
        #endregion

        #region Consturctors
        public UserUploadModel()
        {
        }

        public UserUploadModel(Upload entity)
        {
            this.id = entity.Id;
            this.photo = new PhotoModel(entity.Photo);
            this.description = entity.Description;
            this.user = new UserModel(entity.User);
            this.comments = new List<Comment>();
            this.likes = new List<Like>();
            this.dateTime = entity.DateCreated;
        }

        public Upload ToEntity()
        {
            return new Upload()
            {
                Id = this.id,
                Photo = this.photo.ToEntity(),
                Description = this.description,
                User = this.user.ToEntity(),
            };
        }
        #endregion
    }
}