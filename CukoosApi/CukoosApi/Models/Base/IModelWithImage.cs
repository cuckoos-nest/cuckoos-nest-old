using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CukoosApi.Enums;
using CukoosApi.Models.Base;

namespace CukoosApi.Models.Base
{
	public interface IModelWithImage : IModel
	{
		string image { get; }
		AssetType imageType { get; }
	}
}