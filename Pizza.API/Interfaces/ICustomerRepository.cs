using Pizza.API.DTOs;
using Pizza.API.Entities;

namespace Pizza.API.Interfaces
{
    public interface ICustomerRepository
    {
        void update(Customer customer);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<CustomerDto>> GetCustomersAsync();

        Task<CustomerDto> GetCustomerByPhoneNumberAsync(string phoneNumber);
        Task AddCustomer(CustomerDto customerDto);
    }
}
