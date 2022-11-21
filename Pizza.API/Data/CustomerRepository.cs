using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pizza.API.DTOs;
using Pizza.API.Entities;
using Pizza.API.Interfaces;

namespace Pizza.API.Data
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CustomerRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CustomerDto>> GetCustomersAsync()
        {
            return await _context.Customers.ProjectTo<CustomerDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<CustomerDto> GetCustomerByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Customers.ProjectTo<CustomerDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
        }

        public async Task AddCustomer(CustomerDto customerDto)
        {
            await _context.Customers.AddAsync(new Customer()
            {
                PhoneNumber = customerDto.PhoneNumber,
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName
            });
            await SaveAllAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void update(Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;
        }
    }
}
