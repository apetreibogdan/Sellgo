﻿using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServiceClient
    {

        private IAppDbRepository _db;


        public ServiceClient(IAppDbRepository db)
        {
            _db = db;
        }

        public async Task<List<Client>> GetClientsList()
        {
            var result = await _db.Data.Clients.Select(client => client).ToListAsync();
            return result;
        }


        public async Task<Client> GetClientById(int id)
        {
            Client result = await _db.Data.Clients.FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }

        public async Task<string> DeleteClient(int id)
        {
            Client client = _db.Data.Clients.Find(id);
            string name = client.FirstName + " " + client.LastName + " id: " + id.ToString();
            _db.Data.Clients.Remove(client);
            _db.Data.SaveChanges();
            return name;
        }

        //Add Client      
        public async Task<Client> AddClient([FromBody]Client client)
        {

            await _db.Data.Clients.AddAsync(client);
            await _db.Data.SaveChangesAsync();
            return client;

        }


    }
}
