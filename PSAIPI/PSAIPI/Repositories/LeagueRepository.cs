using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;
using System.Net;
using System.Web.Mvc;

namespace PSAIPI.Repositories
{
    public class LeagueRepository
    {
        private readonly DataContext _context;
        public LeagueRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<League>> GetAll()
        {
            return await _context.Leagues.ToListAsync();
        }

        public async Task<League> GetLeagueById(int id)
        {
            return await _context.Leagues.FindAsync(id);
        }

        public async Task<int> Add(League league)
        {
            _context.Leagues.Add(league);
            await _context.SaveChangesAsync();
            return league.Id;
        }

        public async Task<int> Edit(League league)
        {
            var leagueToEdit = await _context.Leagues.FindAsync(league.Id);
            leagueToEdit.Title = league.Title;
            leagueToEdit.Description = league.Description;
            await _context.SaveChangesAsync();
            return leagueToEdit.Id;
        }

        public async Task Delete(int id)
        {
            var league = await GetLeagueById(id);

            _context.Leagues.Remove(league);
            await _context.SaveChangesAsync();
        }

        public async Task<League_member?> GetMemberById(int id)
        {
            return await _context.League_members.FindAsync(id);
        }

        public async Task<int> AddUserToLeague(int id, int leagueID)
        {
            var member = new League_member
            {
                UserId = id,
                LeagueID = leagueID,
            };
            _context.League_members.Add(member);
            await _context.SaveChangesAsync();
            return member.Id;
        }

        public async Task<List<League_member>> GetLeagueMembers(int id)
        {
            var leagueMembers = await _context.League_members.Include(x => x.User).Where(x => x.LeagueID == id).ToListAsync();
            return leagueMembers;
        }
    }
}
