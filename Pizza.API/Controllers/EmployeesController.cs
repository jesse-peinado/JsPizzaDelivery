using Microsoft.AspNetCore.Mvc;
using Pizza.API.DTOs;
using Pizza.API.Entities;
using Pizza.API.Interfaces;

namespace Pizza.API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeesController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _employeeRepository.GetEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            return employee;
        }

        [HttpPut("{id:int}", Name = "UpdateEmployee")]
        public async Task<ActionResult> UpdateEmployee([FromRoute]int id, [FromBody] EmployeeUpdateDto employeeDto)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (await _employeeRepository.UpdateEmployee(employeeDto, employee))
            {
                return NoContent();
            }

            return BadRequest("Failed to update employee");
        }

        [HttpPost("save")]
        public async Task<ActionResult> AddEmployee([FromBody] EmployeeUpdateDto employeeDto)
        {
            try
            {
                if (employeeDto == null)
                    return BadRequest();

                await _employeeRepository.AddEmployee(employeeDto);

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
