using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace El_Proyecte_Grande.Services
{
    public class ServiceCompany : IServiceCompany
    {

        public IAppDbRepository Repository { get; set; }


        public ServiceCompany(IAppDbRepository repository)
        {
            Repository = repository;
        }

        public async Task<List<Company>> GetCompaniesList()
        {
            List<Company> companies = await Repository.GetCompaniesListAsync();
            List<Company> result = companies.Select(company => new Company
            {
                Id = company.Id,
                Name = company.Name,
                CUI = company.CUI,
                Email = company.Email,
                Address = company.Address,
                Logo = company.Logo,
                Empmloyees = company.Empmloyees,
                Deals = company.Deals,
                Teams = company.Teams
            }).ToList();
            return result;
        }


        public async Task<Company> GetCompanyById(int id)
        {
            Company result = await Repository.GetCompanyByIdAsync(id);

            return result;
        }


        public async Task<Company> AddCompany(Company company)
        {
            return await Repository.AddCompanyAsync(company);
        }

        public async Task<string> DeleteCompany(int id)
        {
            return await Repository.DeleteCompanyAsync(id);
        }


    }
}
