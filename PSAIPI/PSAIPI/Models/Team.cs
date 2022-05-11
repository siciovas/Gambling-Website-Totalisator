using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }
        public string? City { get; set; }
        public string TeamName { get; set; }
        public DateTime? Founded { get; set; }
        public string? TeamColours { get; set; }
        public string? Titles { get; set; }
        public int? WinsInARow { get; set; }
        public int? LosesInARow { get; set; }

        [ForeignKey("FK_Match")]
        public int MatchId { get; set; }
    }
}
