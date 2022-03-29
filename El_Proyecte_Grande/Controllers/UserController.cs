using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Controllers
{
    //[Authorize(Policy ="ManagerOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IServiceUser _services;

        public UserController(IServiceUser services)
        {

            _services = services;
        }

        //Get Users
        [HttpGet]
        public async Task<List<User>> GetUsers()
        {
            return await _services.GetUsers();
        }

        //Get User
        [HttpGet]
        [Route("{id}")]
        public async Task<User> GetUser([FromRoute] string id)
        {
            return await _services.GetUser(id);
        }

        //Add User
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (_services.TryAddUser(user))
            {

                return Ok(await _services.AddUser(user));
            }
            return BadRequest();

        }

        //Delete User
        [HttpDelete()]
        public async Task<IActionResult> DeleteUser([FromQuery] string id)
        {

            User user = _services.Repository.Data.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(await _services.DeleteUser(id));

        }

        //Update User
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] User user)
        {

            if (id != user.Id)
            {
                return BadRequest();
            }

            _services.Repository.Data.Entry(user).State = EntityState.Modified;

            try
            {
                await _services.Repository.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_services.Repository.Data.Users.Any(user => user.Id == id))
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