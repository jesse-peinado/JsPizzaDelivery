using Pizza.API.DTOs;
using Pizza.API.Entities;

namespace Pizza.API.Interfaces
{
    public interface IOrderRepository
    {
        void update(Order order);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<OrderDto>> GetOrdersAsync();

        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrder(OrderDto orderDto);

        Task<bool> UpdateOrder(OrderUpdateDto orderDto, Order order);
    }
}
