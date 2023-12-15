using EV_ChargingApp.BLL.Models;
using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.BLL.Services.Interfaces
{
    public interface ICustomerServiceBLL
    {
        Task<List<CustomerModel>> GetAllCustomers();
        Task<CustomerModel> CreateCustomer([FromBody] CustomerDto customerDto);
        Task<bool> DeleteCustomer(string id);
        Task<double> ChargeTimeDuration([FromBody] TimeDto time);
        Task<CustomerModel> GetTotalCost(string username);
        Task<List<TimeModel>> GetAllDetails(string username);
    }
}
