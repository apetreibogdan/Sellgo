using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServicePersonalApproach
    {
        public IAppDbRepository Repository { get; set; }
        Task<PersonalApproach> AddPersonalApproach([FromBody] PersonalApproach personalApproach);
        Task<string> DeletePersonalApproach(int id);
        Task<List<PersonalApproach>> GetPersonalApproachList(int clientid);
    }
}