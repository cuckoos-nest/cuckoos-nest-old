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
    public class UsersController : ApiController
    {
        private cukooEntities db = new cukooEntities();

        [ResponseType(typeof(UserModel))]
        public IHttpActionResult GetUsers()
        {
            return Ok(db.Users.ToList().Select(x => new UserModel(x)));
        }

        [ResponseType(typeof(UserModel))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserModel(user));
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (userModel.id != id)
            {
                return BadRequest();
            }

            User entity = userModel.ToEntity();

            db.Entry(entity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        public IHttpActionResult PostUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User entity = userModel.ToEntity();

            db.Users.Add(entity);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userModel.id }, userModel);
        }

        [ResponseType(typeof(UserModel))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(new UserModel(user));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.id == id) > 0;
        }
    }
}
