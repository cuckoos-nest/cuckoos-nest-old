using CukoosApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
    public class PhotoModel
    {
        #region Properties
        public int id { get; set; }

        public string title { get; set; }

        public string imageUrl
        {
            get
            {
                return "";
            }
        }

        public CategoryModel Category { get; set; }
        #endregion

        #region Consturctors
        public PhotoModel()
        {
        }

        public PhotoModel(Photo entity)
        {
            this.id = entity.Id;
            this.title = entity.Title;
            
            if (entity.Category != null)
              this.Category = new CategoryModel(entity.Category);
        }

        public Photo ToEntity()
        {
            return new Photo()
            {
                Id = this.id,
                Title = this.title,
                Category = this.Category.ToEntity(),
            };
        }
        #endregion
    }
}