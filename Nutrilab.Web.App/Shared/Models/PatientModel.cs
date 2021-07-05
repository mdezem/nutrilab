
using Itenso.TimePeriod;
using Nutrilab.Web.App.Shared.Services;
using System;
using System.Security.Cryptography;

namespace Nutrilab.Web.App.Shared.Models
{

  public partial class PatientModel : IStoreObject
  {
    public static string GenerateTag()
    {
      var sha = SHA256.Create();
      var bytes = Guid.NewGuid().ToByteArray();
      var resultBytes = sha.ComputeHash(bytes);
      var resultStr = Convert.ToBase64String(resultBytes).ToUpperInvariant();

      return resultStr.Substring(0, 10);
    }

    public int AgeYr
    {
      get
      {
        var diff = new DateDiff(new DateTime(YearOfBirth, MonthOfBirth, 15), DateTime.Now);
        return diff.Years;
      }
    }
  }

}
