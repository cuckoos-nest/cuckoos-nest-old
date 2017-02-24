using CukoosApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using CukoosApi.Repository.Base;
using CukoosApi.Repository.Interfaces;
using CukoosApi.Data;

namespace CukoosApi.Repository.Repositories
{
  public class PhotoRepository : BaseRepository<Photo>, IPhotoRepository
  {
    public CukoosContext CukoosContext { get { return base.Context as CukoosContext; } }

    public PhotoRepository(CukoosContext context)
      : base(context)
    {
    }

  }
}
