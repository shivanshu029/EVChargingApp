using AutoMapper;
using EV_ChargingApp.BLL.Models;
using EV_ChargingApp.BLL.Services.Interfaces;
using EV_ChargingApp.DAL.Dtos;
using EV_ChargingApp.DAL.Repository.Interfaces;
using EV_ChargingApp.DAL.Tools;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EV_ChargingApp.BLL.Services.Implementations
{
   
    public class LoginRegisterServiceBLL : ILoginRegisterServiceBLL
    {
        private readonly IMapper _loginMapper;
        private readonly ILoginRegisterRepository _loginRegisterService;
        public LoginRegisterServiceBLL(ILoginRegisterRepository loginRegisterService)
        {
            _loginRegisterService = loginRegisterService;
            var _configUser = new MapperConfiguration(config => config.CreateMap<UserDto, UserModel>().ReverseMap());
            _loginMapper = new Mapper(_configUser);
        }

        public async Task<bool> userLogin([FromBody] UserDto customer)
        {
            var res = await _loginRegisterService.userLogin(customer);

            UserModel userModel = _loginMapper.Map<UserDto, UserModel>(res);
            string password = Password.hashPassword(customer.password);

            if (userModel == null)
            {
                return false;
            }
            if (userModel != null && userModel.password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<bool> userRegistration([FromBody] UserDto user)
        {
            var dbUser = await _loginRegisterService.userRegistration(user);
            if (dbUser == null)
            {
                return false;
            }
            UserModel userModel = _loginMapper.Map<UserDto, UserModel>(dbUser);
            return true;
        }
    }
}
