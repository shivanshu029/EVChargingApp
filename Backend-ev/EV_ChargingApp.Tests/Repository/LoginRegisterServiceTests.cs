using EV_ChargingApp.BLL.Services.Implementations;
using EV_ChargingApp.DAL.Data;
using EV_ChargingApp.DAL.Dtos;
using EV_ChargingApp.DAL.Repository.Implementations;
using EV_ChargingApp.DAL.Tools;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.Tests.Repository
{
    public class LoginRegisterServiceTests
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
                       username = "admintest" + i.ToString(),
                       lastname = "root",
                       phone = "9999999999",
                       email = "admin@gmail.com",
                       vehicletype = "bike",
                       totalCost = 0,
                   });
                    await databaseContext.SaveChangesAsync();
                }

            }
            if (await databaseContext.Users.CountAsync() < 1)
            {
                for (int i = 0; i < 10; i++)
                {
                    string password = "admin1234";
                    string hashedPassword = Password.hashPassword(password);
                    databaseContext.Users.Add(
                      new UserDto()
                      {
                          username = "admintest" + i.ToString(),
                          password = hashedPassword
                      });
                    await databaseContext.SaveChangesAsync();
                }
            }
            return databaseContext;
        }

        [Fact]
        public async void LoginRegisterService_userRegistration_ReturnsBoolean()
        {
            var user = new UserDto()
            {
                username = "admintest",
                password = "admin1234"
            };
            var dbContext = await GetDbContext();
            var LoginRegisterService = new LoginRegisterRepository(dbContext);

            var customerBLL = new LoginRegisterServiceBLL(LoginRegisterService);

            var result = await customerBLL.userRegistration(user);

            result.Should().BeTrue();

        }

        [Fact]
        public async void LoginRegisterService_userLoginReturnsBoolean()
        {
            var user = new UserDto()
            {
                username = "admintest1",
                password = "admin1234"
            };
            var dbContext = await GetDbContext();
            var LoginRegisterService = new LoginRegisterRepository(dbContext);

            var customerBLL = new LoginRegisterServiceBLL(LoginRegisterService);

            var result = await customerBLL.userLogin(user);

            result.Should().BeTrue();
        }
    }

}
