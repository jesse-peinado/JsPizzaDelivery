using Pizza.API.DTOs;
using Pizza.API.Entities;

namespace Pizza.API.Interfaces
{
    public interface IEmployeeRepository
    {
        void update(Employee employee);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<EmployeeDto>> GetEmployeesAsync();

        Task<Employee> GetEmployeeByIdAsync(int id);

        Task AddEmployee(EmployeeUpdateDto employeeDto);
        Task<bool> UpdateEmployee(EmployeeUpdateDto employeeDto, Employee employee);
    }
}
