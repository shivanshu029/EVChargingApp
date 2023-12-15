using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.DAL.Repository.Interfaces
{
    public interface ILoginRegisterRepository
    {
        Task<UserDto> userLogin([FromBody] UserDto customer);
        Task<UserDto> userRegistration([FromBody] UserDto customer);
    }
}
