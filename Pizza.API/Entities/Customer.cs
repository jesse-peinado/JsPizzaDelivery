using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Pizza.API.Entities
{
    public class Customer
    {
        [Key]
        public string PhoneNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
