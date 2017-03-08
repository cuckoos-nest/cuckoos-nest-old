using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace CukoosApi.DataAnnotations
{
	public sealed class StringValueAttribute : Attribute
	{
		public string Value { get; private set; }

		public StringValueAttribute(string value)
		{
			this.Value = value;
		}
	}
}