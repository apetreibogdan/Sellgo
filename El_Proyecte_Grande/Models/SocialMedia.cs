using El_Proyecte_Grande.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class SocialMedia
    {
        [Key]
        public int Id { get; set; }
        public SocialMediaChannell Channell { get; set; }
        [MaxLength(50)]
        public string Address { get; set; }

        //Relationships
        //Client (ManyToOne)
        public int ClientId { get; set; }
        [ForeignKey("ClientId")]
        public Client Client { get; set; }

    }
}
