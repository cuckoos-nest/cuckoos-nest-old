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
    public class PhotosController : ApiController
    {
        private cukooEntities db = new cukooEntities();

        #region Get
        [ResponseType(typeof(PhotoModel))]
        public IHttpActionResult GetPhotos()
        {
            return Ok(db.Photos.ToList().Select(x => new PhotoModel(x)));
        }

        [ResponseType(typeof(PhotoModel))]
        public IHttpActionResult GetPhoto(int id)
        {
            Photo photo = db.Photos.Find(id);
            if (photo == null)
            {
                return NotFound();
            }

            return Ok(new PhotoModel(photo));
        }

        public IHttpActionResult GetPhotos(int category)
        {
            return Ok(db.Photos.Where(x => x.category == category).ToList().Select(x => new PhotoModel(x)));
        }
        #endregion

        [ResponseType(typeof(void))]
        public IHttpActionResult PutPhoto(int id, PhotoModel photoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (photoModel.id != id)
            {
                return BadRequest();
            }

            Photo entity = photoModel.ToEntity();

            db.Entry(entity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotoExists(id))
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
        public IHttpActionResult PostPhoto(PhotoModel photoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Photo entity = photoModel.ToEntity();

            db.Photos.Add(entity);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = photoModel.id }, photoModel);
        }

        [ResponseType(typeof(PhotoModel))]
        public IHttpActionResult DeletePhoto(int id)
        {
            Photo photo = db.Photos.Find(id);
            if (photo == null)
            {
                return NotFound();
            }

            db.Photos.Remove(photo);
            db.SaveChanges();

            return Ok(new PhotoModel(photo));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PhotoExists(int id)
        {
            return db.Photos.Count(e => e.id == id) > 0;
        }
    }
}
