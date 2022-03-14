using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceInterception
    {
        public IAppDbRepository Repository { get; set; }
        Task<Interception> AddInterception([FromBody] Interception interception);
        Task<string> DeleteInterception(int id);
        Task<Interception> GetInterceptionById(int id);
        Task<List<Interception>> GetInterceptions();
        Task<List<Interception>> GetInterceptionsOfUserWithCloseDate();
    }
}