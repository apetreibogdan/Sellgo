using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceProfessionalApproach
    {
        public IAppDbRepository Repository { get; set; }
        Task<ProfessionalApproach> AddProfessionalApproach([FromBody] ProfessionalApproach professionalApproach);
        Task<string> DeleteProfessionalApproach(int id);
        Task<List<ProfessionalApproach>> GetProfessionalApproachList(int clientid);
    }
}