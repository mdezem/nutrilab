using Nutrilab.Web.App.Shared.Equations;
using Nutrilab.Web.App.Shared.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Client.Services
{
  public class InMemoryStore<T> : IStore<T> where T : IStoreObject
  {
    protected readonly List<T> entries = new();

    public Task AddAsync(T model)
    {
      entries.Add(model);
      return Task.CompletedTask;
    }

    public Task<T> GetAsync(Guid id)
    {
      return Task.FromResult(entries.FirstOrDefault(e => e.Id == id));
    }

    public Task<IEnumerable<T>> GetAllAsync()
    {
      return Task.FromResult(entries.AsReadOnly().AsEnumerable());
    }
  }
}
