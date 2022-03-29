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
    public class CompanyController : ControllerBase
    {

        private IServiceCompany _services;
        public CompanyController(IServiceCompany serviceCompany)
        {

            _services = serviceCompany;
        }

        //GET Companies
        [HttpGet]
        public async Task<List<Company>> GetCompanies()
        {
            List<Company> result = await _services.GetCompaniesList();
            return result;
        }

        //GET Company
        [HttpGet]
        [Route("{id:int}")]
        public async Task<Company> GetCompany([FromRoute] int id)
        {
            Company result = await _services.GetCompanyById(id);
            return result;
        }

        //Add Company 
        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] Company company)
        {
            if (company == null)
            {
                return BadRequest();
            }
            return Ok(await _services.AddCompany(company));
        }

        //Delete Company
        [HttpDelete]
        public async Task<IActionResult> DeleteCompany([FromQuery] int id)
        {

            Company company = _services.Repository.Data.Companies.Find(id);
            if (company == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteCompany(id));

        }

        //Update Company
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCompany(int id, [FromBody] Company company)
        {

            if (id != company.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(company).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.Companies.Any(company => company.Id == id))
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
