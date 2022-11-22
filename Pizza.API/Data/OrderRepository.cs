using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pizza.API.DTOs;
using Pizza.API.Entities;
using Pizza.API.Interfaces;

namespace Pizza.API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrderRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAsync()
        {
            return await _context.Orders.Include(e => e.Employee).Select(
                o => new OrderDto { 
                    Id = o.Id,
                    PizzaType = o.PizzaType,
                    PizzaSize = o.PizzaSize,
                    Price = o.Price,
                    DeliveryAddress = o.DeliveryAddress,
                    OrderStatus = o.OrderStatus,
                    Tip = o.Tip,
                    EstimatedTime = o.EstimatedTime,
                    DateTimeDelivered = o.DateTimeDelivered,
                    DateTimeDelivering = o.DateTimeDelivering,
                    DateTimeOrdered = o.DateTimeOrdered,
                    EmployeeId = o.EmployeeId,
                    PhoneNumber = o.PhoneNumber,
                    FirstName = o.Employee.FirstName,
                    LastName = o.Employee.LastName
            }).ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddOrder(OrderDto orderDto)
        {
            await _context.Orders.AddAsync(new Order()
            {
                PizzaType = orderDto.PizzaType,
                PizzaSize = orderDto.PizzaSize,
                Price = orderDto.Price,
                DeliveryAddress = orderDto.DeliveryAddress,
                OrderStatus = orderDto.OrderStatus,
                PhoneNumber = orderDto.PhoneNumber,
                EstimatedTime = orderDto.EstimatedTime,
                DateTimeOrdered = DateTime.Now
            });
            await SaveAllAsync();
        }

        public async Task<bool> UpdateOrder(OrderUpdateDto orderDto, Order order)
        {
            _mapper.Map(orderDto, order);
            update(order);
            if (await SaveAllAsync())
            {
                return true;
            }
            return false;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
        }
    }
}
