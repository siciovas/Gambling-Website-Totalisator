using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Repositories
{
    public class MatchRepository
    {
        private readonly DataContext _context;
        public MatchRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Match>> GetAllMatches()
        {
            return await _context.Matches.ToListAsync();
        }
        public async Task<int> Add(List<Match> matches)
        {
            foreach (var match in matches)
            {
                var temp = new Match
                {
                    StartDate = match.StartDate,
                    EndDate = match.EndDate,
                    City = match.City,
                    League = match.League,
                    Arena = match.Arena,
                    Broadcaster = match.Broadcaster,
                    HomeTeamPoints = match.HomeTeamPoints,
                    AwayTeamPoints = match.AwayTeamPoints,
                    Status = match.Status
                };
                var response = _context.Matches.Add(temp);
                /*foreach (var item in match.Teams)
                {
                    _context.Teams
                }*/
            }
            await _context.SaveChangesAsync();
            
            return 1;
        }

        internal Task GetMatchById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
