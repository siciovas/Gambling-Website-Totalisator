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

            var allBets = await betRepository.GetAll();
            var editingBet = allBets.Find(l => l.Id == request.Id);

            var leagueId = await betRepository.Edit(request);

            return Ok(leagueId);
           
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Bet>>> Delete(int id)
        {
            await betRepository.Delete(id);

            return Ok(await betRepository.GetAll());
        }
    }
}
