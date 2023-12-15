using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.BLL.Services.Interfaces
{
    public interface ILoginRegisterServiceBLL
    {
        Task<bool> userLogin([FromBody] UserDto customer);
        Task<bool> userRegistration([FromBody] UserDto customer);
    }
}
