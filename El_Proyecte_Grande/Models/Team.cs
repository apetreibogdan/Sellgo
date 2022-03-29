using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }



        public string ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public User Manager { get; set; }



        public byte[] Icon { get; set; }

        //Relationship

        //User (OneToMany)
        public virtual List<User> Sellers { get; set; }

        //Company (ManyToOne)
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }


    }
}
