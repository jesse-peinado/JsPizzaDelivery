using AutoMapper;
using Pizza.API.DTOs;
using Pizza.API.Entities;

namespace Pizza.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDto>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<EmployeeUpdateDto, Employee>();
            CreateMap<OrderUpdateDto, Order>();
        }
    }
}
