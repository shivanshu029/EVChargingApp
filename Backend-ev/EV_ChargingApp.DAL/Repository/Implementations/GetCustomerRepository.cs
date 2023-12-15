using EV_ChargingApp.DAL.Data;
using EV_ChargingApp.DAL.Dtos;
using EV_ChargingApp.DAL.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Repository.Implementations
{
    public class GetCustomerRepository : IGetCustomerRepository
    {
        private readonly ApplicationDbContext _db;

        public GetCustomerRepository(ApplicationDbContext db)
        {
            _db = db;

        }



        public async Task<Customer> CreateCustomer([FromBody] CustomerDto customerDto)
        {
            
                var res = _db.Customers.FirstOrDefault(u => u.email.ToLower() == customerDto.email.ToLower());
                if (res != null)
                {
                    return null;
                }
                Customer model = new()
                {
                    Id=Guid.NewGuid().ToString(),
                    firstname = customerDto.firstname,
                    username = customerDto.username,
                    lastname = customerDto.lastname,
                    phone = customerDto.phone,
                    email = customerDto.email,
                    vehicletype = "",
                    totalCost = 0,
                };

                await _db.Customers.AddAsync(model);
                await _db.SaveChangesAsync();
                return model;

            
           

       
        }

        public async Task<Customer> GetCustomerByIdAsync(string id)
        {
            var customer = await _db.Customers.FirstOrDefaultAsync(u => u.Id.Equals(id));
            return customer;
        }

        public void DeleteCustomer(Customer customer)
        {
            _db.Customers.Remove(customer);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }


        public async Task<List<Customer>> GetAllCustomers()
        {
            var customer = await _db.Customers.ToListAsync();

            return customer;
        }

        public async Task<Customer> GetCustomerByUsernameAsync(string username)
        {
            var res = await _db.Customers.FirstOrDefaultAsync(u => u.username == username);
            return res;
        }

        public async Task<Time> GetTimeByUsernameAndVehicleTypeAsync(string username, string vehicleType)
        {
            var res = await _db.Times.FirstOrDefaultAsync(c => c.username.Equals(username) && c.vehicleType.Equals(vehicleType));
            return res;
        }
        public List<Time> GetTimeListByUsernameAndVehicleType(string username, string vehicleType)
        {
            List<Time> Result = new List<Time>(_db.Times.Where((c) => c.username.Equals(username) && (c.vehicleType.Equals(vehicleType)))).ToList();
            return Result;
        }
        public void AddTime(Time time)
        {
            _db.Times.Add(time);
        }

        public async Task<Customer> GetTotalCost(string username)
        {

            var customer = await _db.Customers.FirstOrDefaultAsync(u => u.username.Equals(username));

            return customer;

        }

        public async Task<List<Time>> GetAllDetails(string username)
        {

            var customerDetails = await _db.Times.Where((c) => c.username.Equals(username)).ToListAsync();
            return customerDetails;
        }
    }
}
