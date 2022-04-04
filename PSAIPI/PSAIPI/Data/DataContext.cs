using Microsoft.EntityFrameworkCore;
using PSAIPI.Models;

namespace PSAIPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<League> Leagues { get; set; }
    }
}
