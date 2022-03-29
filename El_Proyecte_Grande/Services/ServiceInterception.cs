using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServiceInterception : IServiceInterception
    {

        public IAppDbRepository Repository { get; set; }


        public ServiceInterception(IAppDbRepository repository)
        {
            Repository = repository;
        }

        public async Task<List<Interception>> GetInterceptions()
        {
            List<Interception> interceptions = await Repository.GetInterceptionsAsync();
            List<Interception> result = interceptions.Select(inter =>
            new Interception
            {
                Id = inter.Id,
                Date = inter.Date,
                Location = inter.Location,
                Address = inter.Address,
                OnlineMeet = inter.OnlineMeet,
                DealId = inter.DealId,


            }
            ).ToList();
            return interceptions;
        }


        public async Task<Interception> GetInterceptionById(int id)
        {
            var result = await Repository.GetInterceptionByIdAsync(id);

            return result;
        }

        public async Task<string> DeleteInterception(int id)
        {
            return await Repository.DeleteInterceptionAsync(id);
        }


        public async Task<Interception> AddInterception([FromBody] Interception interception)
        {
            return await Repository.AddInterceptionAsync(interception);
        }
        //Unique on Service
        public async Task<List<Interception>> GetInterceptionsOfUserWithCloseDate()
        {
            var deals = await Repository.GetDealsListAsync();

            var allInterceptions = await Repository.GetInterceptionsAsync();

            DateTime now = DateTime.Now;

            List<Interception> interceptions = new();

            foreach (var deal in deals)
            {
                var result = allInterceptions.Where(inter => inter.DealId == deal.Id).Where(inter => inter.Date > DateTime.Now).OrderBy(inter => Convert.ToDateTime(inter.Date)).FirstOrDefault();
                if (result != null)
                {
                    interceptions.Add(result);
                }

            }
            return interceptions.Select(inter => new Interception
            {
                Id = inter.Id,
                Date = inter.Date,
                Location = inter.Location,
                Address = inter.Address,
                OnlineMeet = inter.OnlineMeet,
                DealId = inter.DealId,
            }).ToList();
        }

    }
}
