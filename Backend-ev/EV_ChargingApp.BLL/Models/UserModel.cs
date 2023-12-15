using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.BLL.Models
{
    public class UserModel
    {
        [Key]
        public string username { get; set; }

        public string password { get; set; }
    }
}
