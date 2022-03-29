using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceCompany
    {
        public IAppDbRepository Repository { get; set; }
        Task<Company> AddCompany(Company company);
        Task<string> DeleteCompany(int id);
        Task<List<Company>> GetCompaniesList();
        Task<Company> GetCompanyById(int id);
    }
}