using CukoosApi.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CukoosApi.Extentions
{
	public static class StringValueExtention
	{
		public static string GetStringValue(this Enum value)
		{
			StringValueAttribute[] attributes = (StringValueAttribute[])value.GetType().GetField(value.ToString()).GetCustomAttributes(typeof(StringValueAttribute), false);
			return ((attributes != null) && (attributes.Length > 0)) ? attributes[0].Value : value.ToString();
		}

		public static T ToEnum<T>(this string str)
		{
			foreach (T item in Enum.GetValues(typeof(T)))
			{
				StringValueAttribute[] attributes = (StringValueAttribute[])item.GetType().GetField(item.ToString()).GetCustomAttributes(typeof(StringValueAttribute), false);
				if ((attributes != null) && (attributes.Length > 0) && (attributes[0].Value.Equals(str)))
				{
					return item;
				}
			}
			return (T)Enum.Parse(typeof(T), str, true);
		}
	}
}