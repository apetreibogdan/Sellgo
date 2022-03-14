using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceClient
    {
        IAppDbRepository Repository { get; set; }
        Task<Client> AddClientAsync([FromBody] Client client);
        Task<string> DeleteClientAsync(int id);
        Task<Client> GetClientByIdAsync(int id);
        Task<List<Client>> GetClientsListAsync();
    }
}