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
    public class DealController : ControllerBase
    {

        private IServiceDeal _services;
        public DealController(IServiceDeal serviceDeal)
        {

            _services = serviceDeal;
        }


        //GET Clients
        [HttpGet]
        public async Task<List<Deal>> GetDeals()
        {
            List<Deal> result = await _services.GetDealsList();
            return result;
        }
        //GET Client

        [HttpGet("dealsforuser/{id}")]
        public async Task<List<Deal>> GetDealOfUser([FromRoute] string id)
        {
            List<Deal> result = await _services.GetDealsForUser(id);
            return result;
        }


        //GET Client
        [HttpGet("{id:int}")]
        public async Task<Deal> GetDealById([FromRoute] int id)
        {
            Deal result = await _services.GetDealById(id);
            return result;
        }

        //Add Client  
        [HttpPost]
        public async Task<Deal> AddDeal([FromBody] Deal deal)
        {
            if (deal == null)
            {
                return null;
            }
            return await _services.AddDeal(deal);
        }

        //Delete Client
        [HttpDelete]
        public async Task<IActionResult> DeleteDeal([FromQuery] int id)
        {
            Deal deal = _services.Repository.Data.Deals.Find(id);
            if (deal == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteDeal(id));

        }
        ////Delete Client
        //[HttpDelete()]
        //public async Task<IActionResult> DeleteDeals()
        //{

        //    return Ok(await services.DeleteDeals(id));

        //}

        //Update Client
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateDeal(int id, [FromBody] Deal deal)
        {

            if (id != deal.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(deal).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.Deals.Any(deal => deal.Id == id))
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
