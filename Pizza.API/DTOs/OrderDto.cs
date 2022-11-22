namespace Pizza.API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string PizzaType { get; set; }

        public string PizzaSize { get; set; }

        public decimal Price { get; set; }

        public string DeliveryAddress { get; set; }

        public string OrderStatus { get; set; }

        public decimal? Tip { get; set; }

        public int EstimatedTime { get; set; }

        public DateTime DateTimeOrdered { get; set; }

        public DateTime? DateTimeDelivered { get; set; }

        public DateTime? DateTimeDelivering { get; set; }

        public int? EmployeeId { get; set; }

        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
