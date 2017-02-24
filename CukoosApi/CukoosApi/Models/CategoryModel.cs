using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Models
{
    public class CategoryModel
    {
        #region Properties
        public int id { get; set; }
        public string name { get; set; }
        #endregion

        #region Consturctors
        public CategoryModel()
        {
        }

        public CategoryModel(Category entity)
        {
            this.id = entity.id;
            this.name = entity.name;
        }

        public Category ToEntity()
        {
            return new Category
            {
                id = this.id,
                name = this.name
            };
        }
        #endregion
    }
}