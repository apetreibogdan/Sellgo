using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceUser
    {
        public IAppDbRepository Repository { get; set; }
        Task<User> AddUser(User user);
        Task<string> DeleteUser(string id);
        Task<User> GetUser(string id);
        Task<List<User>> GetUsers();
        bool TryAddUser(User user);
        Task<User> UpdateUser(User newUser);
    }
}