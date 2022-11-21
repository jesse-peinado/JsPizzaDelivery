using Microsoft.AspNetCore.Mvc;
using Pizza.API.DTOs;
using Pizza.API.Entities;
using Pizza.API.Interfaces;

namespace Pizza.API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICustomerRepository _customerRepository;
        public OrdersController(IOrderRepository orderRepository, ICustomerRepository customerRepository)
        {
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            return order;
        }


        [HttpPut("{id:int}", Name = "UpdateOrder")]
        public async Task<ActionResult> UpdateOrder([FromRoute] int id, [FromBody] OrderUpdateDto orderDto)
        {
            if (orderDto.PizzaDelivered)
            {
                orderDto.DateTimeDelivered = DateTime.Now;
            }
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (await _orderRepository.UpdateOrder(orderDto, order))
            {
                return NoContent();
            }

            return BadRequest("Failed to update order");
        }

        [HttpPost("save")]
        public async Task<ActionResult> AddOrder([FromBody] OrderDto orderDto)
        {
            try
            {
                if (orderDto == null)
                    return BadRequest();
                var customer = await _customerRepository.GetCustomerByPhoneNumberAsync(orderDto.PhoneNumber);
                if (customer == null)
                {
                    CustomerDto customerDto = new CustomerDto();
                    customerDto.PhoneNumber = orderDto.PhoneNumber;
                    customerDto.FirstName = orderDto.FirstName;
                    customerDto.LastName = orderDto.LastName;
                    await _customerRepository.AddCustomer(customerDto);
                }
                await _orderRepository.AddOrder(orderDto);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new employee record");
            }
        }
    }
}
