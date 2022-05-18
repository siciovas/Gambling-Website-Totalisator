using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Repositories
{
    public class FriendInviteRepository
    {
        private readonly DataContext _context;
        public FriendInviteRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> SaveUrl(LeagueInvitation leagueInvitation)
        {
            _context.LeagueInvitations.Add(leagueInvitation);
            await _context.SaveChangesAsync();
            return 0;
        }
    }
}
