using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Register
    {
        [Required (ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required")]
        public string Surname { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Your password needs to be at least 6 characters long")]
        public string Password { get; set; }

        [Required (ErrorMessage = "Identity code is required")]
        public string IdentityCode { get; set; }

        [Required(ErrorMessage = "Birthday is required")]
        public DateTime Birthday { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }

        [Required(ErrorMessage = "Postal code is required")]
        public string PostalCode { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        [Required (ErrorMessage = "Email is required")]
        public string Email { get; set; }

        public string IP { get; set; }

        public int ActiveTime { get; set; }

        public bool IsLoggedIn { get; set; }

        public Roles Role { get; set; }

        public Register()
        {

        }


    }
}
