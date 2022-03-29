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
    public class ClientController : ControllerBase
    {

        private IServiceClient _services;
        public ClientController(IServiceClient services)
        {

            _services = services;
        }





        //GET Clients
        [HttpGet]
        public async Task<List<Client>> GetClients()
        {
            List<Client> result = await _services.GetClientsListAsync();
            return result;
        }

        //GET Client
        [HttpGet("{id:int}")]
        public async Task<Client> GetClient([FromRoute] int id)
        {
            Client result = await _services.GetClientByIdAsync(id);
            return result;
        }

        //Add Client  
        [HttpPost]
        public async Task<IActionResult> AddClient([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }
            return Ok(await _services.AddClientAsync(client));
        }

        //Delete Client
        [HttpDelete]
        public async Task<IActionResult> DeleteClient([FromQuery] int id)
        {
            Client client = await _services.GetClientByIdAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteClientAsync(id));

        }

        //Update Client
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] Client client)
        {

            if (id != client.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(client).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.Clients.Any(client => client.Id == id))
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
