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
    public class CustomerServiceBLL : ICustomerServiceBLL
    {
        private readonly IMapper _customerMapper;
        private readonly IMapper _timeMapper;
        private readonly IGetCustomerRepository _customerRepository;
        public CustomerServiceBLL(IGetCustomerRepository customerService)
        {
            _customerRepository = customerService;
            var _configCustomer = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Customer, CustomerModel>().ReverseMap();
            });

            _customerMapper = new Mapper(_configCustomer);
            var _configTime = new MapperConfiguration(config => config.CreateMap<Time, TimeModel>().ReverseMap());
            _timeMapper = new Mapper(_configTime);
        }
        public async Task<List<CustomerModel>> GetAllCustomers()
        {
            List<Customer> res = await _customerRepository.GetAllCustomers();
            if (res == null)
            {
                return null;
            }
            List<CustomerModel> customerModel = _customerMapper.Map<List<Customer>, List<CustomerModel>>(res);
            return customerModel;
        }

        public async Task<bool> DeleteCustomer(string id)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(id);
            if (customer == null)
            {
                return false;
            }

            _customerRepository.DeleteCustomer(customer);
            await _customerRepository.SaveChangesAsync();

            return true;


        }
        public async Task<CustomerModel> CreateCustomer([FromBody] CustomerDto customerDto)
        {
            var uniqueUser = await _customerRepository.GetCustomerByUsernameAsync(customerDto.username);
            if(uniqueUser!=null)
            {
                return null;
            }

            var res = await _customerRepository.CreateCustomer(customerDto);
            if (res == null)
            {
                return null;
            }
            CustomerModel customerModel = _customerMapper.Map<Customer, CustomerModel>(res);
            return customerModel;
        }
        public async Task<double> ChargeTimeDuration([FromBody] TimeDto time)
        {
            if (time == null)
            {
                return -1;
            }
            Time model = new()
            {
                Id = Guid.NewGuid().ToString(),
                username = time.username,
                startTime = time.startTime,
                endTime = time.endTime,
                vehicleType = time.vehicleType,

            };
            var dbCustomer = await _customerRepository.GetCustomerByUsernameAsync(model.username);
            if (dbCustomer == null)
            {
                return -1;
            }

            var timereg = await _customerRepository.GetTimeByUsernameAndVehicleTypeAsync(model.username, model.vehicleType);
            if (timereg == null)
            {
                double currentCost = Calculator.CostCalculator(time);
                if (currentCost == -3)
                {
                    return currentCost;
                }

                dbCustomer.totalCost += currentCost;
                dbCustomer.vehicletype = time.vehicleType;

                _customerRepository.AddTime(model);
                await _customerRepository.SaveChangesAsync();

                return currentCost;
            }

            List<Time> result = _customerRepository.GetTimeListByUsernameAndVehicleType(model.username, model.vehicleType);
            if (result == null)
            {
                double currentCost = Calculator.CostCalculator(time);
                if (currentCost == -3)
                {
                    return currentCost;
                }
                dbCustomer.totalCost += currentCost;
                dbCustomer.vehicletype = time.vehicleType;

                _customerRepository.AddTime(model);
                await _customerRepository.SaveChangesAsync();

                return currentCost;
            }
            else
            {
                bool flag = true;
                foreach (Time value in result)
                {
                    bool noOverlap = (value.startTime > time.endTime || value.endTime < time.startTime);
                    if (!noOverlap)
                    {
                        flag = false;
                        break;
                    }
                }

                if (!flag)
                {
                    return -2;
                }
                else
                {
                    double currentCost = Calculator.CostCalculator(time);
                    if (currentCost == -3)
                    {
                        return currentCost;
                    }

                    dbCustomer.totalCost += currentCost;
                    dbCustomer.vehicletype = time.vehicleType;

                    _customerRepository.AddTime(model);
                    await _customerRepository.SaveChangesAsync();

                    return currentCost;
                }
            }
        }

        public async Task<CustomerModel> GetTotalCost(string username)
        {
            Customer res = await _customerRepository.GetTotalCost(username);
            CustomerModel customerModel = _customerMapper.Map<Customer, CustomerModel>(res);
            return customerModel;

        }

        public async Task<List<TimeModel>> GetAllDetails(string username)
        {
            List<Time> res = await _customerRepository.GetAllDetails(username);
            if (res == null)
            {
                return null;
            }
            List<TimeModel> timeModel = _timeMapper.Map<List<Time>, List<TimeModel>>(res);
            return timeModel;

        }


    }
}
