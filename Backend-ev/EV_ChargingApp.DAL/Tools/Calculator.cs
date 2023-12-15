using EV_ChargingApp.DAL.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Tools
{
    public class Calculator
    {
        public static double CostCalculator(TimeDto time)
        {
            double currentCost = 0;
            double totalHours = (time.endTime - time.startTime).TotalHours;
            if (time.vehicleType == "bicycle")
            {
                currentCost = totalHours * 10;
            }
            else if (time.vehicleType == "bike")
            {
                currentCost = totalHours * 15;
            }
            else if (time.vehicleType == "car")
            {
                currentCost = totalHours * 20;
            }
            else
            {
                currentCost = -3;
            }
            return currentCost;
        }

    }
}
