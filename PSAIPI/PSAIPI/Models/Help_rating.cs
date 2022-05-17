using System.ComponentModel.DataAnnotations;

namespace PSAIPI.Models
{
    public class Help_rating
    {
        [Key]
        public int Id { get; set; }
        public string Rating { get; set; }
        public DateTime Date { get; set; }
    }
}
