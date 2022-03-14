using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace El_Proyecte_Grande.Utils
{
    public class EmailUniqueAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
            {
                var _context = (AppDbContext)validationContext.GetService(typeof(AppDbContext));
                var entityUsers = _context.Users.FirstOrDefault(e => e.Email == value.ToString());
                var enitityClient = _context.Clients.FirstOrDefault(e => e.Email == value.ToString());
                var entityCompany = _context.Companies.FirstOrDefault(e => e.Email == value.ToString());
                if (entityUsers != null || enitityClient!= null || entityCompany != null)
                    {
                        return new ValidationResult(GetErrorMessage(value.ToString()));
                    }
                    return ValidationResult.Success;
                }

        public string GetErrorMessage(string email)
        {
            return $"Email {email} is already in use.";
        }
    }
}