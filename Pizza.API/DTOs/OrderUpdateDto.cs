namespace Pizza.API.DTOs
{
    public class OrderUpdateDto
    {

        public string OrderStatus { get; set; }

        public int? EmployeeId { get; set; }

        public decimal? Tip { get; set; }

        public bool PizzaDelivered { get; set; }

        public DateTime? DateTimeDelivered { get; set; }
    }
}
