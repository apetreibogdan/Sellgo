using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class DateOfInterest
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        //Relations
        //Care (One To Many)
        public int CareId { get; set; }
        [ForeignKey("CareId")]
        public Care Care { get; set; }



    }
}
