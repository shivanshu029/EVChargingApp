using EV_ChargingApp.BLL.Services.Interfaces;
using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EV_ChargingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginRegisterController : ControllerBase
    {
        private readonly ILoginRegisterServiceBLL _loginRegisterServiceBLL;


        public LoginRegisterController( ILoginRegisterServiceBLL loginRegisterServiceBLL)
        {
            _loginRegisterServiceBLL = loginRegisterServiceBLL;
        
        }

        [HttpPost]
        [Route("/customer-login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
       
        public async Task<ActionResult<bool>> userLogin([FromBody] UserDto customer) 
        {
            try
            {
                if (customer == null)
                {
                    return NoContent();
                }
                var res = await _loginRegisterServiceBLL.userLogin(customer);
                if (res == false)
                {
                    return BadRequest(res);
                }
                else
                {
                    return Ok(res);
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpPost]
        [Route("/user-register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> userRegistration([FromBody] UserDto customer)
        {
            try
            {
                var res = await _loginRegisterServiceBLL.userRegistration(customer);
                if (res == false)
                {
                    return BadRequest("User already exists..Try Login");
                }
                return Ok(res);
            }
            catch(Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
         
        }
    }
}
