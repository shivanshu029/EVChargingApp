using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Repository.Interfaces
{
    public interface IGetCustomerRepository
    {
        Task<List<Customer>> GetAllCustomers();

        Task<Customer> CreateCustomer([FromBody] CustomerDto customerDto);

        Task<Customer> GetCustomerByIdAsync(string id);
        Task SaveChangesAsync();
        void DeleteCustomer(Customer customer);
        Task<Customer> GetCustomerByUsernameAsync(string username);
        Task<Time> GetTimeByUsernameAndVehicleTypeAsync(string username, string vehicleType);
        List<Time> GetTimeListByUsernameAndVehicleType(string username, string vehicleType);
        void AddTime(Time time);
        Task<Customer> GetTotalCost(string username);
        Task<List<Time>> GetAllDetails(string username);
    }
}
