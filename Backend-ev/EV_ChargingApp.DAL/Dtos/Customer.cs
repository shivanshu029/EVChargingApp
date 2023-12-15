using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Dtos
{
    public class Customer
    {
        [Key]
        public string Id { get; set; }
        [Required, MaxLength(30)]
        public string username { get; set; }
        [Required, MaxLength(30)]
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phone { get; set; }
        [Required, EmailAddress]
        public string email { get; set; }

        public string vehicletype { get; set; }
        public double totalCost { get; set; }

    }
}
