using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessionalApproachController : ControllerBase
    {

        private IServiceProfessionalApproach _services;

        public ProfessionalApproachController(IServiceProfessionalApproach services)
        {

            _services = services;
        }

        [HttpGet]
        [Route("{clientid:int}")]
        public async Task<List<ProfessionalApproach>> GetProfessionalApproach([FromRoute] int clientid)
        {
            return await _services.GetProfessionalApproachList(clientid);
        }



        [HttpPost]
        public async Task<IActionResult> AddProfessionalApproach([FromBody] ProfessionalApproach personalApproach)
        {
            if (personalApproach == null)
            {
                return BadRequest();
            }

            return Ok(await _services.AddProfessionalApproach(personalApproach));


        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProfessionalApproach([FromQuery] int clientid, int id)
        {

            ProfessionalApproach personalApproach = _services.Repository.Data.ProfessionalApproaches.Find(id);
            if (personalApproach == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteProfessionalApproach(id));

        }
        //Update PRofessional
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProfessionalApproach(int id, [FromBody] ProfessionalApproach professionalApproach)
        {

            if (id != professionalApproach.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(professionalApproach).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.ProfessionalApproaches.Any(professionalApproach => professionalApproach.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();

        }
    }

}
