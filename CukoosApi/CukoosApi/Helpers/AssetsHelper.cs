using CukoosApi.Enums;
using CukoosApi.Extentions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace CukoosApi.Helpers
{
	public static class AssetsHelper
	{
		public static string GetLocalPath(AssetType type, int identifier)
		{
			return HttpRuntime.AppDomainAppPath + $"assets/{type.GetStringValue()}/{identifier}.png";
		}

		public static void Save(AssetType type, int identifier, string base64Image)
		{
			string localPath = GetLocalPath(type, identifier);
			byte[] imageBytes = Convert.FromBase64String(base64Image.Trim('\0'));
			File.WriteAllBytes(localPath, imageBytes);
		}

		public static string Get(AssetType type, int identifier)
		{
			string localPath = GetLocalPath(type, identifier);

			if (File.Exists(localPath) == false)
				return string.Empty;

			byte[] imageBytes = File.ReadAllBytes(localPath);
			return Convert.ToBase64String(imageBytes);
		}

		internal static void Save(object imageType, int id, string image)
		{
			throw new NotImplementedException();
		}
	}
}