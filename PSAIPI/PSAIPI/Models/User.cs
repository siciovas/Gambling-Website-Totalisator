using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdentityCode { get; set; }
        public int YearOfBirth { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PostCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RegistrationIP { get; set; } = string.Empty;
        public bool IsConfirmed { get; set; }
        public bool IsLoggedIn { get; set; }

        public League_member? LeagueMember { get; set; }
        public RoleType Role { get; set; }

        public enum RoleType
        {
            Paprastas_naudotojas,
            Admin,
            CustomerSpecialist
        }
    }
}
