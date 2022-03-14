using El_Proyecte_Grande.Dtos;
using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Data.Repository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserByRegisterAsync(RegisterDto registerDto);
        Task<ResponseLoginDto> LoginUserAsync(LoginDto loginDto);
    }
}