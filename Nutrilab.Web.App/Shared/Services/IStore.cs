using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Shared.Services
{
  public interface IStore<T> where T : IStoreObject
  {
    Task AddAsync(T model);
    Task<T> GetAsync(Guid id);

    Task<IEnumerable<T>> GetAllAsync();
  }
}