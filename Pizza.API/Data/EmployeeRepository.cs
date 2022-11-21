using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pizza.API.DTOs;
using Pizza.API.Entities;
using Pizza.API.Interfaces;

namespace Pizza.API.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmployeeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
        {
            return await _context.Employees.ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddEmployee(EmployeeUpdateDto employeeDto)
        {
            await _context.Employees.AddAsync(new Employee()
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                IsCurrentEmployee = employeeDto.IsCurrentEmployee,
                Salary = employeeDto.Salary
            });
            await SaveAllAsync();
        }

        public async Task<bool> UpdateEmployee(EmployeeUpdateDto employeeDto, Employee employee)
        {
            _mapper.Map(employeeDto, employee);
            update(employee);
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

        public void update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
        }
    }
}
