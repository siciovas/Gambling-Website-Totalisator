using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Repositories
{
    public class BetRepository
    {
        private readonly DataContext _context;
        public BetRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Bet>> GetAll()
        {
            return await _context.Bets.ToListAsync();
        }

        public async Task<Bet> GetBetById(int id)
        {
            return await _context.Bets.FindAsync(id);
        }

        public async Task<int> Add(Bet bet)
        {
            _context.Bets.Add(bet);
            await _context.SaveChangesAsync();
            return bet.Id;
        }

        public async Task<int> Edit(Bet league)
        {
            var betToEdit = await _context.Leagues.FindAsync(league.Id);
         /*   betToEdit.Title = league.Title;
            betToEdit.Description = league.Description;*/
            await _context.SaveChangesAsync();
            return betToEdit.Id;
        }

        public async Task Delete(int id)
        {
            var bet = await GetBetById(id);

            _context.Bets.Remove(bet);
            await _context.SaveChangesAsync();
        }
    }
}
