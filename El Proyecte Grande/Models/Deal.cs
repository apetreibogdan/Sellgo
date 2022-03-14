using El_Proyecte_Grande.Utils;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace El_Proyecte_Grande.Models
{
    public class Deal
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public PriorityTypes Priority { get; set; }
        public StatusTypes Status { get; set; }


        //Relationship 

        //Client (OneToManyToManyToOne)
        public int ClientId { get; set; }
        [ForeignKey("ClientId")]
        public Client Client { get; set; }


        public string Company { get; set; }

        //public bool DeleteStatus { get; set; }// TODO de facut dupa ce am terminat cu testele si tot!! SOFT DELETE


        //Interception (OneToMany)
        public virtual List<Interception> Interceptions { get; set; }
        //Products (OneToMany)
        public virtual List<Product> Products { get; set; }
        //public string DealCompany { get; set; }
    }
}
