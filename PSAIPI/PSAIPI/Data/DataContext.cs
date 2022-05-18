using Microsoft.EntityFrameworkCore;
using PSAIPI.Models;

namespace PSAIPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<League> Leagues { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<League_member> League_members { get; set; }
        public DbSet<Prize> Prizes { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Bet> Bets { get; set; }
        public DbSet<Help_rating> Help_ratings { get; set; }
        public DbSet<LeagueInvitation> LeagueInvitations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<User>().HasOne(a => a.LeagueMember).WithOne(a => a.User).HasForeignKey<League_member>(c => c.UserId);
            modelBuilder.Entity<Match>().Property(u => u.Status).HasConversion<string>();
            modelBuilder.Entity<Match>().Property(p => p.Id).ValueGeneratedNever();
        }
    }
}
