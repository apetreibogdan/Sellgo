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
    public class ServiceDeal : IServiceDeal
    {

        public IAppDbRepository Repository { get; set; }


        public ServiceDeal(IAppDbRepository repository)
        {
            Repository = repository;
        }

        public async Task<List<Deal>> GetDealsList()
        {
            List<Deal> companies = await Repository.GetDealsListAsync();
            List<Deal> result = companies.Select(deal => deal).ToList();
            return result;
        }

        public async Task<List<Deal>> GetDealsForUser(string id)
        {
            var result = await Repository.GetDealsForUserAsync(id);
            return result;
        }


        public async Task<Deal> GetDealById(int id)
        {
            Deal result = await Repository.GetDealByIdAsync(id);

            return result;
        }

        public async Task<string> DeleteDeal(int id)
        {

            return await Repository.DeleteDealAsync(id);
        }
        //public async Task<string> DeleteDeals()
        //{
        //    DateTime today = DateTime.Now;
        //    string day1 = today.Day.ToString();
        //    if (day1 =="1" )
        //    {
        //        List<Deal> deals = await _db.Data.Deals.ToListAsync();
        //        foreach (Deal deal in deals)
        //        {
        //            if (deal.Status == Utils.StatusTypes.Sealed || deal.Status == Utils.StatusTypes.Failed)
        //            {
        //                _db.Data.Deals.Remove(deal);
        //                await _db.Data.SaveChangesAsync();
        //            }
        //        }
        //        return "Today is the day when deals are deleted";
        //    }


        //    return "Nothing was deleted";
        //}

        //Add Client      
        public async Task<Deal> AddDeal([FromBody] Deal deal)
        {
            return await Repository.AddDealAsync(deal);
        }
    }
}
