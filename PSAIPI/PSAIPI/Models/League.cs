using System.ComponentModel.DataAnnotations;

namespace PSAIPI.Models
{
    public class League
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CreatorId { get; set; }

        public League (int id, string title, string description, int creatorId)
        {
            Id = id;
            Title = title;
            Description = description;
            CreatorId = creatorId;
        }

    }
}
