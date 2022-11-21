namespace Pizza.API.DTOs
{
    public class EmployeeUpdateDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public decimal Salary { get; set; }

        public bool IsCurrentEmployee { get; set; }
    }
}
