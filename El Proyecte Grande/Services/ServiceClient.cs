using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServiceClient : IServiceClient
    {

        public IAppDbRepository Repository { get; set; }


        public ServiceClient(IAppDbRepository repository)
        {
            Repository = repository;
        }

        public async Task<List<Client>> GetClientsListAsync()
        {
            var result = await Repository.GetClientsListAsync();
            return result;
        }


        public async Task<Client> GetClientByIdAsync(int id)
        {

            var client = await Repository.GetClientByIdAsync(id);


            if (client != null)
            {
                Client result = new Client

                {
                    Id = client.Id,
                    FirstName = client.FirstName,
                    LastName = client.LastName,
                    Email = client.Email,
                    PhoneNumber = client.PhoneNumber,
                    CompanyId = client.CompanyId,
                    Company = client.Company,
                    DateOfBirth = client.DateOfBirth,
                    Position = client.Position,
                    Gender = client.Gender,
                    Address = client.Address,
                    ProfessionalApproach = client.ProfessionalApproach,
                    PersonalApproach = client.PersonalApproach,
                    Deals = client.Deals,
                    SocialMedias = client.SocialMedias
                };

                return result;
            }
            return null;

        }

        public async Task<string> DeleteClientAsync(int id)
        {

            return await Repository.DeleteClientAsync(id);
        }

        //Add Client      
        public async Task<Client> AddClientAsync([FromBody] Client client)
        {


            return await Repository.AddClientAsync(client);

        }
    }
}
