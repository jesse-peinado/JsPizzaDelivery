namespace Pizza.API.DTOs
{
    public class EmployeeCompensationReportDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public decimal HoursWorked { get; set; }

        public decimal TotalSalaryPaid { get; set; }

        public decimal TotalTip { get; set; }

        public decimal TotalPaid { get; set; }

        public int OrderCount { get; set; }
    }
}
