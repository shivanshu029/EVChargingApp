using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Dtos
{
   
    public class UserDto
    {
        [Key, Required, MinLength(3)]
        public string username { get; set; }
        [Required, MinLength(8)]
        public string password { get; set; }
    }
}
