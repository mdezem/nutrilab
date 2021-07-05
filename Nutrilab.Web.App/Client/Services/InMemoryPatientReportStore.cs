using Nutrilab.Web.App.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Client.Services
{
  public class InMemoryPatientReportStore : InMemoryStore<PatientReportModel>, IPatientReportStore
  {
    public Task<IEnumerable<PatientReportModel>> GetByPatientId(Guid patientId)
    {
      return Task.FromResult(entries.Where(e => e.PatientId == patientId));
    }
  }
}
