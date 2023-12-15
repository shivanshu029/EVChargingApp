using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.BLL.Models
{
    public class TimeModel
    {

        [Key]
        public string Id { get; set; }

        public string username { get; set; }

        public DateTime startTime { get; set; }

        public DateTime endTime { get; set; }

        public string vehicleType { get; set; }
       


    }
}
