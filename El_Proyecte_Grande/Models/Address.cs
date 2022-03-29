using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Country { get; set; }
        [Required]
        [MaxLength(30)]
        public string City { get; set; }
        [MaxLength(50)]
        public string Street { get; set; }
        public string Note { get; set; }
        [MaxLength(200)]
        public string Geolocation { get; set; }

        //Relationship
        //Client (OneToOne)        
        public int ClientId { get; set; }
        [ForeignKey("ClientId")]
        public virtual Client Client { get; set; }


    }
}
