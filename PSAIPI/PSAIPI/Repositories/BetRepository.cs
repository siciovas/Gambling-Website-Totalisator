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

        public async Task<int> ChangeBetStatusToLost(Bet bet)
        {
            var allBets = await GetAll();
            var lostBets = allBets.Where(ab => ab.MatchId == bet.MatchId && ab.BetName == bet.BetName).ToList();
            lostBets.ForEach(ab => ab.Status = "Lost");
            
            var betsChanged = await _context.SaveChangesAsync();
            return betsChanged;
        }

        public async Task<int> ChangeBetStatusToWon(Bet bet)
        {
            var allBets = await GetAll();
            var wonBets = allBets.Where(ab => ab.MatchId == bet.MatchId && ab.BetName == bet.BetName).ToList();
            wonBets.ForEach(ab => ab.Status = "Won");

            var betsChanged = await _context.SaveChangesAsync();
            return betsChanged;
        }

        public async Task<List<int>> GetWinnersLeagueIds(Bet bet)
        {
            var allBets = await GetAll();
            var winnersLeagueIds = allBets.Where(ab => ab.MatchId == bet.MatchId && ab.BetName == bet.BetName)
                .Select(b => b.LeagueMemberId).Distinct().ToList();

            return winnersLeagueIds;
        }

        public async Task<int> Edit(Bet bet)
        {
            var betToEdit = await _context.Bets.FindAsync(bet.Id);
            betToEdit.BetName = bet.BetName;
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
