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

        public async Task<List<Prize>> GetAll()
        {
            return await _context.Prizes.ToListAsync();
        }

        public async Task<Prize> GetPrizeById(int id)
        {
            return _context.Prizes.SingleOrDefault(prize => prize.Id == id);
        }
    }
}
