﻿using El_Proyecte_Grande.Dtos;
using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Data.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountRepository(UserManager<User> userManager,
            SignInManager<User> signInManager, IConfiguration configuration)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
        }

        public async Task<IdentityResult> CreateUserByRegisterAsync(RegisterDto registerDto)
        {
            User user = new User()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                Password = Utils.Helper.HashPassword(registerDto.Password)
            };
            return await _userManager.CreateAsync(user, registerDto.Password);
        }

        public async Task<string> LoginUserAsync(LoginDto loginDto)
        {
           var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false ); //first false for RememberMe the second for blocking if attempt fails
            User user = await _signInManager.UserManager.FindByEmailAsync(loginDto.Email);
            if (!result.Succeeded)
            {
                return null;
            }
            List<Claim> authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, loginDto.Email),
                new Claim(ClaimTypes.Role, user.Position.ToString()),
                new Claim("Team", user.TeamId.ToString()),
                new Claim("ManagerTeam", user.Team.Manager.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())           
            };
            SymmetricSecurityKey authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        

    }
}
