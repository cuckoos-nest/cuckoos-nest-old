using CukoosApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace CukoosApi.Controllers.Base
{
    public abstract class BaseApiController : ApiController
    {
		#region Fields
		protected CukoosContext __db = new CukoosContext();
		#endregion

		#region Methods
		protected override void Dispose(bool disposing)
		{
			__db.Dispose();
			base.Dispose(disposing);
		}
		#endregion
	}
}
