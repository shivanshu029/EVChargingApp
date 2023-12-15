using EV_ChargingApp.BLL.Models;
using EV_ChargingApp.BLL.Services.Interfaces;
using EV_ChargingApp.DAL.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EV_ChargingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CustomerController : Controller
    {

        private readonly ICustomerServiceBLL _customerServiceBLL;

        public CustomerController(ICustomerServiceBLL customerServiceBLL)
        {
            _customerServiceBLL = customerServiceBLL;
        }


        [HttpGet]
        [Route("/all-customers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Customer>>> GetAllCustomers()
        {
            try
            {
                var res = await _customerServiceBLL.GetAllCustomers();

                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
            

        }



        [HttpPost]
        [Route("/add-customer/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateCustomer([FromBody] CustomerDto customerDto)
        {

            try 
            {
                var res = await _customerServiceBLL.CreateCustomer(customerDto);
                if (res == null)
                {
                    return BadRequest("User Not Created..Email and Username already exists");
                }
                return Ok("User Created");
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
           

        }

        //[HttpDelete]
        //[Route("/remove-customer/{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<ActionResult<bool>> DeleteCustomer(string id)
        //{

        //    var res = await _customerServiceBLL.DeleteCustomer(id);
        //    if (res == false)
        //    {
        //        return BadRequest(false);
        //    }
        //    return Ok(true);
        //}


        [HttpPost]
        [Route("/charging-details/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        public async Task<ActionResult<double>> chargeTimeDuration([FromBody] TimeDto time)
        {
            try
            {
                int result = DateTime.Compare(time.startTime, time.endTime);
                if (result > 0 || result == 0)
                {
                    return BadRequest("Invalid Date and Time ..Please enter correct Date & Time ");
                }
                var cost = await _customerServiceBLL.ChargeTimeDuration(time);

                if (cost == -1)
                {
                    return NotFound("Incorrect details ...No record Found");
                }

                if (cost == -2)
                {
                    return BadRequest("A Booking Already exists for the same vehicle in this time frame");
                }
                if (cost == -3)
                {
                    return BadRequest("Invalid Vehicle Type");
                }
                return Ok(cost);
            }
            catch(Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
            
        }

        [HttpGet]
        [Route("/cost/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<double>> GetTotalCost(string username)
        {
            try
            {
                var res = await _customerServiceBLL.GetTotalCost(username);
                if (res == null)
                {
                    return NotFound("No Record Found"); ;
                }
                return Ok(res.totalCost);

            }
            catch(Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
           
        }

        [HttpGet]
        [Route("/all-details/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<CustomerModel>>> GetAllDetails(string username)
        {
            try
            {
                var res = await _customerServiceBLL.GetAllDetails(username);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
            catch(Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
          

        }


        [NonAction]
        public IActionResult Index()
        {

            return View();
        }
    }
}
