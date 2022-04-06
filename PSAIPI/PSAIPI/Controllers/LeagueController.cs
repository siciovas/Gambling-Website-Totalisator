using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly DataContext _context;

        public LeagueController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<League>>> Get()
        {
            return Ok(await _context.Leagues.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<League>> Get(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league == null)
                return BadRequest("League not found");
            return Ok(league);
        }

        [HttpPost]
        public async Task<ActionResult<List<League>>> AddLeague(League league)
        {
            var existingLeague = await _context.Leagues.FirstOrDefaultAsync(l => l.Title == league.Title);
            if (existingLeague == null)
            {
                _context.Leagues.Add(league);
                await _context.SaveChangesAsync();

                return Ok(league.Id);
            } else
            {
                return Conflict("League is already exists");
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<League>>> EditLeague(League request)
        {
            var league = await _context.Leagues.FindAsync(request.Id);
            if (league == null)
                return BadRequest("League not found");

            var existingLeague = await _context.Leagues.FirstOrDefaultAsync(l => l.Title == request.Title);
            if (existingLeague == null)
            {
                league.Title = request.Title;
                league.Description = request.Description;

                await _context.SaveChangesAsync();

                return Ok(request.Id);
            } else
            {
                return Conflict("League is already exists");
            }


            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<League>>> Delete(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league == null)
                return BadRequest("League not found");

            _context.Leagues.Remove(league);
            await _context.SaveChangesAsync();

            return Ok(await _context.Leagues.ToListAsync());
        }
    }
}
