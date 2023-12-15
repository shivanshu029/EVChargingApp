using EV_ChargingApp.DAL.Data;
using EV_ChargingApp.DAL.Dtos;
using EV_ChargingApp.DAL.Repository.Interfaces;
using EV_ChargingApp.DAL.Tools;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Repository.Implementations
{
    public class LoginRegisterRepository : ILoginRegisterRepository
    {

        private readonly ApplicationDbContext _db;
        public LoginRegisterRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<UserDto> userLogin([FromBody] UserDto customer)
        {


            var dbUser = await _db.Users.FirstOrDefaultAsync(u => u.username == customer.username);
            return dbUser;

        }

        public async Task<UserDto> userRegistration([FromBody] UserDto user)
        {


            var dbUser = await _db.Users.Where(u => u.username == user.username).FirstOrDefaultAsync();

            if (dbUser != null)
            {
                return null;
            }

            user.password = Password.hashPassword(user.password);
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return user;

        }


    }
}
