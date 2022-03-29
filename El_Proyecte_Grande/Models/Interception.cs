using El_Proyecte_Grande.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Interception
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public LocationTypes Location { get; set; }
        public string Address { get; set; }
        [MaxLength(250)]
        public string OnlineMeet { get; set; }

        //Relationship
        //Deal (ManyToOne)
        [Required]
        public int DealId { get; set; }
        [ForeignKey("DealId")]
        public Deal Deal { get; set; }
    }
}
