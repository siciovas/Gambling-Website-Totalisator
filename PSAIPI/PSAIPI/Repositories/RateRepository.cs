using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Repositories
{
    public class RateRepository
    {
        private readonly DataContext _context;
        public RateRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Help_rating rating)
        {
            _context.Help_ratings.Add(rating);
            await _context.SaveChangesAsync();
            return rating.Id;
        }
    }
}
