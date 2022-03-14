using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Repository
{
    public class AppDbRepository : IAppDbRepository
    {
        public AppDbContext Data { get; set; }
        public AppDbRepository([FromServices] AppDbContext db)
        {
            Data = db;
        }



        #region Client
        #region Get
        public async Task<List<Client>> GetClientsListAsync()
        {
            var result = await Data.Clients.ToListAsync();
            return result;
        }
        public async Task<Client> GetClientByIdAsync(int id)
        {
            Client result = await Data.Clients.FirstOrDefaultAsync(client => client.Id == id);

            return result;
        }
        #endregion
        #region Create
        public async Task<Client> AddClientAsync([FromBody] Client client)
        {

            await Data.Clients.AddAsync(client);
            await Data.SaveChangesAsync();
            return client;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteClientAsync(int id)
        {
            Client client = await Data.Clients.FindAsync(id);
            string name = client.FirstName + " " + client.LastName + " id: " + id.ToString();
            Data.Clients.Remove(client);
            await Data.SaveChangesAsync();
            return name;
        }
        #endregion
        #endregion

        #region Company
        #region Get
        public async Task<List<Company>> GetCompaniesListAsync()
        {
            var result = await Data.Companies.ToListAsync();
            return result;
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
        {
            Company result = await Data.Companies.FirstOrDefaultAsync(company => company.Id == id);

            return result;
        }
        #endregion
        #region Create
        public async Task<Company> AddCompanyAsync(Company company)
        {

            //company.Id = _db.Data.Users.OrderBy(company => company.Id).Select(company => company.Id).Last() + 1;
            await Data.Companies.AddAsync(company);
            await Data.SaveChangesAsync();
            return company;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteCompanyAsync(int id)
        {
            var obj = await Data.Companies.FindAsync(id);
            string name = obj.Name + " CUI:" + obj.CUI + " ID:" + obj.Id + " is deleted";
            Data.Companies.Remove(obj);
            await Data.SaveChangesAsync();
            return name;
        }
        #endregion
        #endregion

        #region User
        #region Get
        public async Task<User> GetUserAsync(string id)
        {
            return await Data.Users.FirstOrDefaultAsync(user => user.Id == id);
        }
        public async Task<List<User>> GetUsersAsync()
        {
            return await Data.Users.ToListAsync();
        }
        #endregion
        #region Create
        public async Task<User> AddUserAsync(User user)
        {
            user.Password = Utils.Helper.HashPassword(user.Password);
            //user.Id = _db.Data.Users.OrderBy(user => user.Id).Select(user => user.Id).Last() + 1;
            await Data.Users.AddAsync(user);
            await Data.SaveChangesAsync();
            return user;

        }
        #endregion
        #region Update
        public async Task<User> UpdateUserAsync(User newUser)
        {
            //_db.Data.Users.Update(newUser);
            Data.Entry(newUser).State = EntityState.Modified;

            await Data.SaveChangesAsync();
            return newUser;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteUserAsync(string id)
        {
            User user = await Data.Users.FindAsync(id);
            string name = user.FirstName + " " + user.LastName + " id: " + id.ToString();
            Data.Users.Remove(user);
            await Data.SaveChangesAsync();
            return name;
        }
        #endregion
        #endregion

        #region Deal
        #region Get
        public async Task<List<Deal>> GetDealsListAsync()
        {
            var result = await Data.Deals.ToListAsync();
            return result;
        }
        public async Task<List<Deal>> GetDealsForUserAsync(string id)
        {
            var result = await Data.Deals.Where(deal => deal.UserId == id).ToListAsync();
            return result;
        }
        public async Task<Deal> GetDealByIdAsync(int id)
        {
            Deal result = await Data.Deals.FirstOrDefaultAsync(deal => deal.Id == id);

            return result;
        }
        #endregion
        #region Create
        public async Task<Deal> AddDealAsync([FromBody] Deal deal)
        {

            await Data.Deals.AddAsync(deal);
            await Data.SaveChangesAsync();
            return deal;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteDealAsync(int id)
        {
            Deal deal = await Data.Deals.FindAsync(id);
            Data.Deals.Remove(deal);
            await Data.SaveChangesAsync();
            return $"Deal with {id} got delete";
        }
        #endregion
        #endregion

        #region Product
        #region Get
        public async Task<List<Product>> GetProductListAsync()
        {
            var result = await Data.Products.ToListAsync();
            return result;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            var result = await Data.Products.FirstOrDefaultAsync(product => product.Id == id);
            return result;
        }
        #endregion
        #region Create
        public async Task<Product> AddProductAsync(Product product)
        {
            await Data.Products.AddAsync(product);
            await Data.SaveChangesAsync();
            return product;
        }
        #endregion
        #region Delete
        public async Task<string> DeleteProductAsync(int id)
        {
            var obj = await Data.Products.FindAsync(id);
            string name = obj.Name + " ID:" + obj.Id.ToString() + " is deleted";
            Data.Products.Remove(obj);
            await Data.SaveChangesAsync();
            return name;
        }
        #endregion
        #endregion

        #region Interception
        #region Get
        public async Task<List<Interception>> GetInterceptionsAsync()
        {
            var result = await Data.Interceptions.ToListAsync();
            return result;
        }
        public async Task<Interception> GetInterceptionByIdAsync(int id)
        {
            var result = await Data.Interceptions.FirstOrDefaultAsync(inter => inter.Id == id);

            return result;
        }
        #endregion
        #region Create
        public async Task<Interception> AddInterceptionAsync([FromBody] Interception interception)
        {

            await Data.Interceptions.AddAsync(interception);
            await Data.SaveChangesAsync();
            return interception;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteInterceptionAsync(int id)
        {
            var interception = await Data.Interceptions.FindAsync(id);
            string result = "id: " + interception.Id.ToString() + "online meet:  " + interception.OnlineMeet;
            Data.Interceptions.Remove(interception);
            await Data.SaveChangesAsync();
            return result;
        }
        #endregion
        #endregion

        #region Personal
        #region Get
        public async Task<List<PersonalApproach>> GetPersonalApproachListAsync(int clientid)
        {
            var result = await Data.PersonalApproaches.Where(approach => approach.ClientId == clientid).ToListAsync();
            return result;
        }
        #endregion
        #region Create
        public async Task<PersonalApproach> AddPersonalApproachAsync([FromBody] PersonalApproach personalApproach)
        {

            await Data.PersonalApproaches.AddAsync(personalApproach);
            await Data.SaveChangesAsync();
            return personalApproach;

        }
        #endregion
        #region Delete
        public async Task<string> DeletePersonalApproachAsync(int id)
        {
            PersonalApproach personalApproach = await Data.PersonalApproaches.FindAsync(id);
            Data.PersonalApproaches.Remove(personalApproach);
            await Data.SaveChangesAsync();
            return $"Deal with {id} got delete";
        }
        #endregion
        #endregion

        #region Professional
        #region Get
        public async Task<List<ProfessionalApproach>> GetProfessionalApproachListAsync(int clientid)
        {
            var result = await Data.ProfessionalApproaches.Where(approach => approach.ClientId == clientid).ToListAsync();
            return result;
        }
        #endregion
        #region Create
        public async Task<ProfessionalApproach> AddProfessionalApproachAsync([FromBody] ProfessionalApproach professionalApproach)
        {

            await Data.ProfessionalApproaches.AddAsync(professionalApproach);
            await Data.SaveChangesAsync();
            return professionalApproach;

        }
        #endregion
        #region Delete
        public async Task<string> DeleteProfessionalApproachAsync(int id)
        {
            ProfessionalApproach professionalApproach = await Data.ProfessionalApproaches.FindAsync(id);
            Data.ProfessionalApproaches.Remove(professionalApproach);
            await Data.SaveChangesAsync();
            return $"Professional Approach with {id} got delete";
        }
        #endregion
        #endregion

    }
}
