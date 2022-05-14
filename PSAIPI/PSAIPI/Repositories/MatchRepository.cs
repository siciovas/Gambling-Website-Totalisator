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
            return await _context.Matches.Include(a => a.Team1).Include(a => a.Team2).ToListAsync();
        }
        public async Task<int> Add(List<Match> matches)
        {
            var allTeams = await _context.Teams.ToListAsync();
            foreach (var match in matches)
            {
                var team1Id = allTeams.Where(a => a.TeamName == match.Team1.TeamName).Select(a => a.Id).FirstOrDefault();
                var team2Id = allTeams.Where(a => a.TeamName == match.Team2.TeamName).Select(a => a.Id).FirstOrDefault();
                var matchExist = _context.Matches.Where(a => a.Id == match.Id).FirstOrDefault();
                if (matchExist is null)
                {
                var temp = new Match
                {
                    Id = match.Id,
                    StartDate = match.StartDate,
                    EndDate = match.EndDate,
                    City = match.City,
                    League = match.League,
                    Arena = match.Arena,
                    Broadcaster = match.Broadcaster,
                    HomeTeamPoints = match.HomeTeamPoints,
                    AwayTeamPoints = match.AwayTeamPoints,
                    Status = match.Status,
                    Team1Id = team1Id,
                    Team2Id = team2Id
                };
                var response = _context.Matches.Add(temp);
                }
                /*foreach (var item in match.Teams)
                {
                    _context.Teams
                }*/
            }
            await _context.SaveChangesAsync();
            
            return 1;
        }
    }
}
