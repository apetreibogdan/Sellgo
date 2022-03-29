using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [MaxLength(300)]
        public string Description { get; set; }
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualPrice { get; set; }
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MinimPrice { get; set; }
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SoldPrice { get; set; }
        [MaxLength(300)]
        public string Guarantees { get; set; }
        [MaxLength(300)]
        public string Benefits { get; set; }
        [MaxLength(300)]
        public string UpSell { get; set; }
        [MaxLength(300)]
        public string CrossSell { get; set; }
        [MaxLength(300)]
        public string BundlingSell { get; set; }

        //Relationship
        //Deal (ManyToOne)
        public int DealId { get; set; }
        [ForeignKey("DealId")]
        public Deal Deal { get; set; }
    }
}
