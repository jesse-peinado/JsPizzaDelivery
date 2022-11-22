using System.ComponentModel.DataAnnotations.Schema;

namespace Pizza.API.Entities
{
    public class Order
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

        public DateTime? DateTimeDelivered{ get; set; }

        public DateTime? DateTimeDelivering { get; set; }

        public Employee? Employee { get; set; }

        [ForeignKey("Employee")]
        public int? EmployeeId { get; set; }

        public Customer Customer { get; set; }

        [ForeignKey("Customer")]
        public string PhoneNumber { get; set; }
    }
}
