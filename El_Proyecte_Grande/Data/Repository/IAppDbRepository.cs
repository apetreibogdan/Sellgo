using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Repository
{
    public interface IAppDbRepository
    {
        AppDbContext Data { get; set; }

        Task<Client> AddClientAsync([FromBody] Client client);
        Task<Company> AddCompanyAsync(Company company);
        Task<Deal> AddDealAsync([FromBody] Deal deal);
        Task<Interception> AddInterceptionAsync([FromBody] Interception interception);
        Task<PersonalApproach> AddPersonalApproachAsync([FromBody] PersonalApproach personalApproach);
        Task<Product> AddProductAsync(Product product);
        Task<ProfessionalApproach> AddProfessionalApproachAsync([FromBody] ProfessionalApproach professionalApproach);
        Task<User> AddUserAsync(User user);
        Task<string> DeleteClientAsync(int id);
        Task<string> DeleteCompanyAsync(int id);
        Task<string> DeleteDealAsync(int id);
        Task<string> DeleteInterceptionAsync(int id);
        Task<string> DeletePersonalApproachAsync(int id);
        Task<string> DeleteProductAsync(int id);
        Task<string> DeleteProfessionalApproachAsync(int id);
        Task<string> DeleteUserAsync(string id);
        Task<Client> GetClientByIdAsync(int id);
        Task<List<Client>> GetClientsListAsync();
        Task<List<Company>> GetCompaniesListAsync();
        Task<Company> GetCompanyByIdAsync(int id);
        Task<Deal> GetDealByIdAsync(int id);
        Task<List<Deal>> GetDealsForUserAsync(string id);
        Task<List<Deal>> GetDealsListAsync();
        Task<Interception> GetInterceptionByIdAsync(int id);
        Task<List<Interception>> GetInterceptionsAsync();
        Task<List<PersonalApproach>> GetPersonalApproachListAsync(int clientid);
        Task<Product> GetProductByIdAsync(int id);
        Task<List<Product>> GetProductListAsync();
        Task<List<ProfessionalApproach>> GetProfessionalApproachListAsync(int clientid);
        Task<User> GetUserAsync(string id);
        Task<List<User>> GetUsersAsync();
        Task<User> UpdateUserAsync(User newUser);
    }
}