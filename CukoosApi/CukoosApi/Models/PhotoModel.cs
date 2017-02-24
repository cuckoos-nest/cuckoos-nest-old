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
            this.id = entity.id;
            this.title = entity.title;
            this.Category = new CategoryModel(entity.Category1);
        }

        public Photo ToEntity()
        {
            return new Photo()
            {
                id = this.id,
                title = this.title,
                category = this.Category.id,
            };
        }
        #endregion
    }
}