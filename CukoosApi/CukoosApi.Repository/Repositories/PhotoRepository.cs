using CukoosApi.Data.Entities;
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
  public class PhotoRepository : BaseRepository<PhotoEntity>, IPhotoRepository
  {
    public CukoosContext CukoosContext { get { return base.Context as CukoosContext; } }

    public PhotoRepository(CukoosContext context)
      : base(context)
    {
    }

  }
}
