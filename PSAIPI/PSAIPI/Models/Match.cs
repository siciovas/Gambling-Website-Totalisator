using System.ComponentModel.DataAnnotations;

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

        public List<Team> Teams { get; set; }
    }

    public enum Status
    {
        Created,
        Coming,
        InProgress,
        Ended
    }
}
