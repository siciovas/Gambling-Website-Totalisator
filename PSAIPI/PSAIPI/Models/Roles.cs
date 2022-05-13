using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Roles
    {
        enum RoleType
        {
            Paprastas_naudotojas,
            Admin,
            CustomerSpecialist
        }
    }
}
