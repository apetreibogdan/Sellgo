using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServicePersonalApproach : IServicePersonalApproach
    {
        public IAppDbRepository Repository { get; set; }

        public ServicePersonalApproach(IAppDbRepository repository)
        {
            Repository = repository;
        }



        public async Task<List<PersonalApproach>> GetPersonalApproachList(int clientid)
        {
            var result = await Repository.GetPersonalApproachListAsync(clientid);
            return result;
        }


        //Add Personal Approach Service 
        public async Task<PersonalApproach> AddPersonalApproach([FromBody] PersonalApproach personalApproach)
        {
            return await Repository.AddPersonalApproachAsync(personalApproach);
        }

        public async Task<string> DeletePersonalApproach(int id)
        {

            return await Repository.DeletePersonalApproachAsync(id);
        }


    }
}
