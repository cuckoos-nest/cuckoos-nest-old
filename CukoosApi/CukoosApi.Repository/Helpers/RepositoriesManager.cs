using CukoosApi.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Repository.Helpers
{
	public static class RepositoriesManager
	{
		private static Dictionary<Type, IRepository> _repositories = new Dictionary<Type, IRepository>();

		public static T GetInstance<T>()
			where T : IRepository
		{
			T instance;
			if (_repositories.ContainsKey(typeof(T)))
				instance = (T)_repositories[typeof(T)];
			else {
				instance = (T)Activator.CreateInstance(typeof(T));
				_repositories.Add(typeof(T), instance);
			}

			return instance;
		}

		public static void CleanUp()
		{
			foreach (IRepository repository in _repositories.Values)
			{
				repository.Dispose();
			}

			_repositories.Clear();
		}
	}
}
