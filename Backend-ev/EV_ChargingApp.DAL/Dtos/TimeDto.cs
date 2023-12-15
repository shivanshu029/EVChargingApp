using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Dtos
{
    public class TimeDto
    {
        [Required]
        public string? username { get; set; }
        [Required]
        public DateTime startTime { get; set; }
        [Required]
        public DateTime endTime { get; set; }
        [Required]
        public string? vehicleType { get; set; }

    }
}
