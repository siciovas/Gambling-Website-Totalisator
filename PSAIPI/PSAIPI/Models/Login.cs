using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Login
    {
        [Required(ErrorMessage = "Please enter your email address")]
        [EmailAddress]
        public string EmailAdress { get; set; }
        [Required(ErrorMessage = "Please enter your password")]
        public string Password { get; set; }

    }
}
