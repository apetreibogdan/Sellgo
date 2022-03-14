using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using El_Proyecte_Grande.Utils;
using El_Proyecte_Grande.Repository;

namespace El_Proyecte_Grande.Services
{
    public class ServiceUser : IServiceUser
    {
        public IAppDbRepository Repository { get; set; }
        public ServiceUser(IAppDbRepository repository)
        {
            Repository = repository;
        }
        public async Task<User> GetUser(string id)
        {
            return await Repository.GetUserAsync(id);
        }

        public async Task<List<User>> GetUsers()
        {
            return await Repository.GetUsersAsync();
        }

        public async Task<User> AddUser(User user)
        {

            return await Repository.AddUserAsync(user);

        }
        //unique Service method
        public bool TryAddUser(User user)
        {
            if (user.Password == user.ConfirmPassword)
            {
                return true;
            }
            return false;
        }

        public async Task<string> DeleteUser(string id)
        {

            return await Repository.DeleteUserAsync(id);
        }

        public async Task<User> UpdateUser(User newUser)
        {
            return await Repository.UpdateUserAsync(newUser);
        }


    }
}