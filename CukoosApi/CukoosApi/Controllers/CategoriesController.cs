using CukoosApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CukoosApi.Controllers
{
    public class CategoriesController : ApiController
    {
        private cukooEntities db = new cukooEntities();

        #region Get
        [ResponseType(typeof(CategoryModel))]
        public IHttpActionResult GetCategories()
        {
            return Ok(db.Categories.ToList().Select(x => new CategoryModel(x)));
        }

        [ResponseType(typeof(CategoryModel))]
        public IHttpActionResult GetCategory(int id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(new CategoryModel(category));
        }
        #endregion

        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategory(int id, CategoryModel categoryModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (categoryModel.id != id)
            {
                return BadRequest();
            }

            Category entity = categoryModel.ToEntity();

            db.Entry(entity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.OK);
        }

        [ResponseType(typeof(PhotoModel))]
        public IHttpActionResult PostCategory(CategoryModel categoryModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Category entity = categoryModel.ToEntity();

            db.Categories.Add(entity);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryModel.id }, categoryModel);
        }

        [ResponseType(typeof(PhotoModel))]
        public IHttpActionResult DeleteCategory(int id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            db.SaveChanges();

            return Ok(new CategoryModel(category));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.id == id) > 0;
        }
    }
}
