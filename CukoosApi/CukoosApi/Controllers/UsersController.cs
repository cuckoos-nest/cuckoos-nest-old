using CukoosApi.Data;
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
    #region Get
    [ResponseType(typeof(UserModel))]
    public IHttpActionResult GetUsers()
    {
      using (var db = new CukoosContext())
      {
        return Ok(db.Users.ToList().Select(x => new UserModel(x)));
      }
    }

    [ResponseType(typeof(UserModel))]
    public IHttpActionResult GetUser(int id)
    {
      using (var db = new CukoosContext())
      {
        var user = db.Users.Find(id);

        if (user == null)
          return NotFound();

        return Ok(new UserModel(user));
      }
    }

    [ResponseType(typeof(UserModel))]
    public IHttpActionResult GetUsers(long fb_id)
    {
      using (var db = new CukoosContext())
      {
        var user = db.Users.FirstOrDefault(x => x.FacebookId == fb_id);

        if (user == null)
          return NotFound();

        return Ok(new UserModel(user));
      }
    }
    #endregion

    [ResponseType(typeof(void))]
    public IHttpActionResult PutUser(int id, UserModel userModel)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (userModel.id != id)
        return BadRequest();

      using (var db = new CukoosContext())
      {
        var entity = userModel.ToEntity();

        db.Entry(entity).State = EntityState.Modified;

        try
        {
          db.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
          if (!UserExists(id))
            return NotFound();
          else
            throw;
        }

        return StatusCode(HttpStatusCode.OK);
      }
    }

    [ResponseType(typeof(PhotoModel))]
    public IHttpActionResult PostUser([FromBody] UserModel userModel)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var entity = userModel.ToEntity();

      using (var db = new CukoosContext())
      {
        db.Users.Add(entity);
        db.SaveChanges();

        userModel = new UserModel(db.Users.Single(x => x.Id == entity.Id));
      }

      return CreatedAtRoute("CukoosApi", new { id = userModel.id }, userModel);
    }

    [ResponseType(typeof(UserModel))]
    public IHttpActionResult DeleteUser(int id)
    {
      using (var db = new CukoosContext())
      {
        var user = db.Users.Find(id);

        if (user == null)
          return NotFound();

        db.Users.Remove(user);
        db.SaveChanges();

        return Ok(new UserModel(user));
      }
    }

    private bool UserExists(int id)
    {
      using (var db = new CukoosContext())
      {
        return db.Users.Count(e => e.Id == id) > 0;
      }
    }
  }
}
