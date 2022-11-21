using Microsoft.AspNetCore.Mvc;
using Pizza.API.DTOs;
using Pizza.API.Interfaces;

namespace Pizza.API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var customers = await _customerRepository.GetCustomersAsync();
            return Ok(customers);
        }


        [HttpGet("{phoneNumber}", Name = "GetCustomer")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(string phoneNumber)
        {
            var customer = await _customerRepository.GetCustomerByPhoneNumberAsync(phoneNumber);
            return customer;
        }
    }
}
