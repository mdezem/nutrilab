using Nutrilab.Web.App.Shared.Models;

namespace Nutrilab.Web.App.Client.Services
{
  public class InMemoryPatientStore : InMemoryStore<PatientModel>, IPatientStore
  {

  }
}
