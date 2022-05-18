using System.ComponentModel.DataAnnotations;

namespace PSAIPI.Models
{
    public class LeagueInvitation
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
    }
}
