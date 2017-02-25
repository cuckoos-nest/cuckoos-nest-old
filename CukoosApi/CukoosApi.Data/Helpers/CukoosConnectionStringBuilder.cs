using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Helpers
{
  public class CukoosConnectionStringBuilder
  {
    private string _initialCatalog;
    private string _dataSource;
    private string _userId;
    private string _password;

    public CukoosConnectionStringBuilder()
    {
      //In case connection string comes from the Configuration file
    }

    public CukoosConnectionStringBuilder(string initialCatalog, string dataSource, string userId, string password)
    {
      this._initialCatalog = initialCatalog;
      this._dataSource = dataSource;
      this._userId = userId;
      this._password = password;
    }

    public string BuildConnectionString()
    {
      bool connFromConfig = string.IsNullOrEmpty(this._initialCatalog)
                            && string.IsNullOrEmpty(this._dataSource)
                            && string.IsNullOrEmpty(this._userId)
                            && string.IsNullOrEmpty(this._password);

      if (connFromConfig)
      {
        return ConfigurationManager.
          ConnectionStrings["CukoosContext"].ConnectionString;
      }

      else
      {
        var connBuilder = new SqlConnectionStringBuilder
        {
          InitialCatalog = _initialCatalog,
          DataSource = _dataSource,
          UserID = _userId,
          Password = _password
        };

        return connBuilder.ConnectionString;
      }
    }
  }
}
