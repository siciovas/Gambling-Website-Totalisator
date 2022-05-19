using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Bet
    {
        [Key]
        public int Id { get; set; }
        public string BetName { get; set; }
        public double Odds { get; set; }
        public DateTime Date { get; set; }
        public double BetAmount { get; set; }
        public bool IsValid { get; set; }
        public string Status { get; set; }

        [ForeignKey("MatchId")]
        public int MatchId { get; set; }
        public Match? Match { get; set; }

        [ForeignKey("LeagueMemberId")]
        public int LeagueMemberId { get; set; }
        public League_member? LeagueMember { get; set; }
    }
}
