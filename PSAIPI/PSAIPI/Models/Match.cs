using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PSAIPI.Models
{
    public class Match
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? City { get; set; }
        public string League { get; set; }
        public string? Arena { get; set; }
        public string? Broadcaster { get; set; }
        public int? HomeTeamPoints { get; set; }
        public int? AwayTeamPoints { get; set; }
        public Status Status { get; set; }
        [ForeignKey("Team1")]
        public int Team1Id { get; set; }
        public Team Team1 { get; set; }
        [ForeignKey("Team2")]
        public int Team2Id { get; set; }
        public Team Team2 { get; set; }
    }

    public enum Status
    {
        Created,
        Coming,
        InProgress,
        Ended
    }
}
