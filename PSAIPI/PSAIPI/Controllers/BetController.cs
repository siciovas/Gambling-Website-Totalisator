using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetController : ControllerBase
    {
        private readonly BetRepository betRepository;

        public BetController(DataContext context)
        {
            betRepository = new BetRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Bet>>> Get()
        {
            return Ok(await betRepository.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bet>> Get(int id)
        {
            var bet = await betRepository.GetBetById(id);
            if (bet == null)
                return BadRequest("Bet not found");
            return Ok(bet);
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddBet(Bet bet)
        {
           var betId = await betRepository.Add(bet);
           return Ok(betId);
            
        }

        [HttpPut]
        public async Task<ActionResult<int>> EditBet(Bet request)
        {

            var allLeagues = await betRepository.GetAll();
            var editingLeague = allLeagues.Find(l => l.Id == request.Id);

            if (editingLeague.Match == request.Match)
            {
                var leagueId = await betRepository.Edit(request);

                return Ok(leagueId);
            }
            else
            {
                /*var existingLeague = allLeagues.Find(l => l.Match == request.Match);
                if (existingLeague == null)
                {
                    var leagueId = await betRepository.Edit(request);

                    return Ok(leagueId);

                }*/
                return Conflict("Bet like this already exists");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Bet>>> Delete(int id)
        {
            await betRepository.Delete(id);

            return Ok(await betRepository.GetAll());
        }
    }
}
