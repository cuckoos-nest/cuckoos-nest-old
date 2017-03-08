using CukoosApi.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Enums
{
	public enum AssetType
	{
		[StringValue("Photos")]
		Photo,

		[StringValue("UserImages")]
		UserImage,

		[StringValue("UserUploads")]
		UserUpload
	}
}
