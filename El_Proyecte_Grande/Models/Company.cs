using El_Proyecte_Grande.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string CUI { get; set; }
        [EmailUnique]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [MaxLength(100)]
        public string Email { get; set; }
        public string Address { get; set; }
        public byte[] Logo { get; set; }

        //Relationship
        //Client (OneToMany)
        public virtual List<Client> Empmloyees { get; set; }
        public virtual List<Deal> Deals { get; set; }


        //Team (OneToMany)
        public List<Team> Teams { get; set; }


    }
}
