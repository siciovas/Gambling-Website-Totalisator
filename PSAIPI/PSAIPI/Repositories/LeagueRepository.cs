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


    }
}
