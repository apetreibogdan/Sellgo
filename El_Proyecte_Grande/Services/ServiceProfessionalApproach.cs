using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServiceProfessionalApproach : IServiceProfessionalApproach
    {
        public IAppDbRepository Repository { get; set; }

        public ServiceProfessionalApproach(IAppDbRepository repository)
        {
            Repository = repository;
        }
        public async Task<List<ProfessionalApproach>> GetProfessionalApproachList(int clientid)
        {
            var result = await Repository.GetProfessionalApproachListAsync(clientid);
            return result;
        }

        public async Task<string> DeleteProfessionalApproach(int id)
        {
            return await Repository.DeleteProfessionalApproachAsync(id);
        }


        public async Task<ProfessionalApproach> AddProfessionalApproach([FromBody] ProfessionalApproach professionalApproach)
        {
            return await Repository.AddProfessionalApproachAsync(professionalApproach);
        }
    }
}
