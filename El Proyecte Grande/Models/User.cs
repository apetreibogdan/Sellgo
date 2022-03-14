using El_Proyecte_Grande.Utils;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class User : IdentityUser
    {

        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }

        [JsonIgnore]
        [Required]
        [StringLength(150, MinimumLength = 6)]
        public string Password { get; set; }

        [JsonIgnore]
        [Required]
        [NotMapped]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        public UserPosition Position { get; set; }

        public byte[] Image { get; set; }

        //Relationship

        //Deal (OneToMany)
        public virtual List<Deal> Deals { get; set; }

        //Team (ManyToOne)
        public int? TeamId { get; set; }
        [ForeignKey("TeamId")]
        public Team Team { get; set; }



    }
}
