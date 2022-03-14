using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Controllers
{
    //[Authorize(Policy ="ManagerOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class InterceptionController : ControllerBase
    {

        private IServiceInterception _services;

        public InterceptionController(IServiceInterception serviceInterception)
        {

            _services = serviceInterception;
        }


        //Get Interceptions
        [HttpGet]
        public async Task<List<Interception>> GetInterceptions()
        {
            return await _services.GetInterceptions();
        }

        //Get Interception
        [HttpGet]
        [Route("{id}")]
        public async Task<Interception> GetInterception([FromRoute] int id)
        {
            return await _services.GetInterceptionById(id);
        }
        //Get Interceptions
        [HttpGet]
        [Route("closedate")]
        public async Task<List<Interception>> GetInterceptionsOfUserWithCloseDate()
        {

            var result = await _services.GetInterceptionsOfUserWithCloseDate();
            return result;
        }


        //Add Interception
        [HttpPost]
        public async Task<IActionResult> AddInterception([FromBody] Interception interception)
        {
            if (interception == null)
            {
                return BadRequest();
            }

            return Ok(await _services.AddInterception(interception));


        }

        //Delete Interception
        [HttpDelete]
        public async Task<IActionResult> DeleteInterception([FromQuery] int id)
        {

            Interception interception = _services.Repository.Data.Interceptions.Find(id);
            if (interception == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteInterception(id));

        }

        //Update Interception
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInterception(int id, [FromBody] Interception interception)
        {

            if (id != interception.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(interception).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.Interceptions.Any(interception => interception.Id == id))
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