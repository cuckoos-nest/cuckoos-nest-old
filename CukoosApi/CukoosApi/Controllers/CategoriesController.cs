using CukoosApi.Data;
using CukoosApi.Data.Models;
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
    #region Get
    [ResponseType(typeof(CategoryModel))]
    public IHttpActionResult GetCategories()
    {
      using (var db = new CukoosContext())
      {
        return Ok(db.Categories.ToList().Select(x => new CategoryModel(x)));
      }
    }

    [ResponseType(typeof(CategoryModel))]
    public IHttpActionResult GetCategory(int id)
    {
      using (var db = new CukoosContext())
      {
        Category category = db.Categories.Find(id);

        if (category == null)
          return NotFound();

        return Ok(new CategoryModel(category));
      }
    }
    #endregion

    [ResponseType(typeof(void))]
    public IHttpActionResult PutCategory(int id, CategoryModel categoryModel)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (categoryModel.id != id)
        return BadRequest();

      Category entity = categoryModel.ToEntity();

      using (var db = new CukoosContext())
      {
        db.Entry(entity).State = EntityState.Modified;

        try
        {
          db.SaveChanges();
        }

        catch (DbUpdateConcurrencyException)
        {
          if (!CategoryExists(id))
            return NotFound();
          else
            throw;
        }

        return StatusCode(HttpStatusCode.OK);
      }
    }

    [ResponseType(typeof(PhotoModel))]
    public IHttpActionResult PostCategory(CategoryModel categoryModel)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      Category entity = categoryModel.ToEntity();

      using (var db = new CukoosContext())
      {
        db.Categories.Add(entity);
        db.SaveChanges();
      }

      return CreatedAtRoute("DefaultApi", new { id = categoryModel.id }, categoryModel);
    }

    [ResponseType(typeof(PhotoModel))]
    public IHttpActionResult DeleteCategory(int id)
    {
      using (var db = new CukoosContext())
      {
        Category category = db.Categories.Find(id);

        if (category == null)
          return NotFound();

        db.Categories.Remove(category);
        db.SaveChanges();

        return Ok(new CategoryModel(category));
      }
    }

    private bool CategoryExists(int id)
    {
      using (var db = new CukoosContext())
      {
        return db.Categories.Count(e => e.Id == id) > 0;
      }
    }
  }
}
