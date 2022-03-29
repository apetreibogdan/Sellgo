using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class PersonalApproach
    {
        [Key]
        public int Id { get; set; }
        public string Details { get; set; }

        //Relationship
        //Client (OneToOne)
        public int ClientId { get; set; }
        [ForeignKey("ClientId")]
        public Client Client { get; set; }


        //Care (OneToMany)
        public virtual List<Care> Cares { get; set; }
    }
}
