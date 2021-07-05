using Nutrilab.Web.App.Shared.Models;
using Nutrilab.Web.App.Shared.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Client.Services
{
  public interface IPatientReportStore : IStore<PatientReportModel>
  {
    Task<IEnumerable<PatientReportModel>> GetByPatientId(Guid patientId);
  }
}