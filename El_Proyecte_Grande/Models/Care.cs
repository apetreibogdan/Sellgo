using El_Proyecte_Grande.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Care
    {
        [Key]
        public int Id { get; set; }
        public CaresTypes ToCare { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Details { get; set; }

        //Relationship
        //PersonalApproach (Many To One)
        public int PersonalApproachId { get; set; }
        [ForeignKey("PersonalApproachId")]
        public PersonalApproach PersonalApproach { get; set; }

        //DateOfInteres(One To Many)
        public List<DateOfInterest> DatesOfInterest { get; set; }



    }
}
