using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceDeal
    {
        public IAppDbRepository Repository { get; set; }
        Task<Deal> AddDeal([FromBody] Deal deal);
        Task<string> DeleteDeal(int id);
        Task<Deal> GetDealById(int id);
        Task<List<Deal>> GetDealsForUser(string id);
        Task<List<Deal>> GetDealsList();
    }
}