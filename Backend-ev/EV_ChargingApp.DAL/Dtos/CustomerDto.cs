using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Dtos
{
    public class CustomerDto
    {
       
        [Required]
        public string? username { get; set; }
        [Required]
        [MaxLength(30)]
        public string? firstname { get; set; }
        public string? lastname { get; set; }
        [Required, Phone , MinLength(10)]
        public string? phone { get; set; }
        [Required, EmailAddress]
        public string? email { get; set; }

    }
}
