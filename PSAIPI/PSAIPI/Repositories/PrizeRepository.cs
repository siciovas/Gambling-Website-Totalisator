using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Repositories
{
    public class PrizeRepository
    {
        private readonly DataContext _context;
        public PrizeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Prize>> GetAllPrizes()
        {
            return await _context.Prizes.ToListAsync();
        }

        public async Task<Prize> GetPrizeById(int id)
        {
            return _context.Prizes.FirstOrDefault(x => x.Id == id);
        }
    }
}
