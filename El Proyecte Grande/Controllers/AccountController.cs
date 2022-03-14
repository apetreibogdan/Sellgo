using El_Proyecte_Grande.Data.Repository;
using El_Proyecte_Grande.Dtos;
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IAppDbRepository _appDb;

        public AccountController(IAccountRepository accountRepository, IAppDbRepository appDb)
        {
            this._accountRepository = accountRepository;
            this._appDb = appDb;
        }





        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto registerDto)
        {
            IdentityResult result = await _accountRepository.CreateUserByRegisterAsync(registerDto);
            if (result.Succeeded)
            {
                return Ok();
            }
            return Unauthorized();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            try
            {
                ResponseLoginDto result = await _accountRepository.LoginUserAsync(loginDto);
                User user = _appDb.Data.Users.Where(user => user.Email == loginDto.Email).Single();
                if (string.IsNullOrEmpty(result.Name))
                {
                    return Unauthorized();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return Unauthorized(e);
            }
        }


    }
}
