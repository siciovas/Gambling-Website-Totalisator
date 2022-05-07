using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class League_member
    {
        [Key]
        public int Id { get; set; }
        public int WinningAmount { get; set; }
        public int LoosingAmount { get; set; }
        public int Rating { get; set; }
        public double Balance { get; set; }
        public int LeagueID { get; set; }

        public int UserId { get;set; }
        public User User { get; set; }
    }
}
