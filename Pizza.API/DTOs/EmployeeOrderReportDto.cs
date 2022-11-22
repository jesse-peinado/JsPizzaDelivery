namespace Pizza.API.DTOs
{
    public class EmployeeOrderReportDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int OrderId { get; set; }

        public decimal Price { get; set; }

        public decimal Tip { get; set; }

        public int CompletionTime { get; set; }

        public int EstimatedTime { get; set; }

        public int DifferenceBetweenCompletionAndEstimated { get; set; }
    }
}
