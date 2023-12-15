using EV_ChargingApp.BLL.Models;
using EV_ChargingApp.BLL.Services.Implementations;
using EV_ChargingApp.DAL.Data;
using EV_ChargingApp.DAL.Dtos;
using EV_ChargingApp.DAL.Repository.Implementations;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.Tests.Repository
{
    public class GetCustomerServiceTests
    {
        private async Task<ApplicationDbContext> GetDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            var databaseContext = new ApplicationDbContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Customers.CountAsync() < 1)
            {
                for (int i = 0; i < 10; i++)
                {
                    databaseContext.Customers.Add(
                   new Customer()
                   {
                       Id = i.ToString(),
                       firstname = "admin",
                       username = "admintest",
                       lastname = "root",
                       phone = "9999999999",
                       email = "admin@gmail.com",
                       vehicletype = "car",
                       totalCost = 10,
                   });
                    await databaseContext.SaveChangesAsync();
                }

                for (int i = 0; i < 10; i++)
                {
                    databaseContext.Times.Add(
                   new Time()
                   {
                       Id = Guid.NewGuid().ToString(),
                       username = "admintest",
                       startTime = DateTime.Now,
                       endTime = DateTime.Now.AddHours(1),
                       vehicleType = "car"
                   });
                    await databaseContext.SaveChangesAsync();
                }

            }
            return databaseContext;
        }

        [Fact]
        public async void GetCustomerService_CreateCustomer_ReturnsCustomerDto()
        {
            CustomerDto customer = new()
            {
                firstname = "admin",
                username = "admintests",
                lastname = "root",
                phone = "9999999999",
                email = "adminss@gmail.com",


            };
            var dbContext = await GetDbContext();

            var GetCustomerService = new GetCustomerRepository(dbContext);

            var customerBLL = new CustomerServiceBLL(GetCustomerService);
            var result = await customerBLL.CreateCustomer(customer);

            result.Should().BeOfType<CustomerModel>();
            result.firstname.Should().BeEquivalentTo(customer.firstname);
            result.username.Should().BeEquivalentTo(customer.username);
            result.lastname.Should().BeEquivalentTo(customer.lastname);
            result.email.Should().BeEquivalentTo(customer.email);
            result.phone.Should().BeEquivalentTo(customer.phone);

        }

        [Fact]
        public async void GetCustomerService_DeleteCustomer_ReturnsBoolean()
        {
            var Id = "1";

            var dbContext = await GetDbContext();
            var GetCustomerService = new GetCustomerRepository(dbContext);

            var customerBLL = new CustomerServiceBLL(GetCustomerService);

            var result = await customerBLL.DeleteCustomer(Id);


            result.Should().BeTrue();
        }

        [Fact]
        public async void GetCustomerService_GetAllCustomers_ReturnsCustomerList()
        {
            var dbContext = await GetDbContext();
            var GetCustomerService = new GetCustomerRepository(dbContext);

            var customerBLL = new CustomerServiceBLL(GetCustomerService);


            var result = await customerBLL.GetAllCustomers();

            result.Should().BeOfType<List<CustomerModel>>();
            result.Should().NotBeNull();

        }



        [Fact]
        public async void GetCustomerService_ChargeTimeDuration_ReturnsCurrentCost()
        {
            var timeDto = new TimeDto()
            {
                username = "admintest",
                startTime = DateTime.Now,
                endTime = DateTime.Now.AddHours(1),
                vehicleType = "bike"
            };

            var dbContext = await GetDbContext();

            var tolerance = 1;
            var GetCustomerService = new GetCustomerRepository(dbContext);

            var customerBLL = new CustomerServiceBLL(GetCustomerService);

            var result = await customerBLL.ChargeTimeDuration(timeDto);

            result.Should().BeGreaterThan(0);
            result.Should().BeApproximately(15, tolerance);
        }

        [Fact]
        public async void GetCustomerService_GetTotalCost_ReturnsTotalCost()
        {
            var username = "admintest";
            var tolerance = 1;

            var dbContext = await GetDbContext();
            var GetCustomerService = new GetCustomerRepository(dbContext);
            var customerBLL = new CustomerServiceBLL(GetCustomerService);

            var result = await customerBLL.GetTotalCost(username);
            result.Should().BeOfType<CustomerModel>();
            result.Should().NotBeNull();
            result.totalCost.Should().BeApproximately(10, tolerance);

        }

        [Fact]
        public async void GetCustomerService_GetAllDetails_ReturnsTimeDetailsList()
        {
            var username = "admintest";
            var dbContext = await GetDbContext();
            var GetCustomerService = new GetCustomerRepository(dbContext);
            var customerBLL = new CustomerServiceBLL(GetCustomerService);


            var result = await customerBLL.GetAllDetails(username);
            result.Should().BeOfType<List<TimeModel>>();
            result.Should().NotBeNull();
        }
    }
}
