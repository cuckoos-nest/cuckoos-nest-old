using CukoosApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Models.Base
{
	public interface IModel
	{
		int id { get; set; }
		IEntity ToIEntity();
		void FromIEntity(IEntity entity);
	}
}
