using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/MatchApproval")]
    [ApiController]
    public class MatchApprovalController : ControllerBase
    {
        private readonly BetRepository betRepository;
        private readonly LeagueRepository leagueRepository;

        public MatchApprovalController(DataContext context)
        {
            betRepository = new BetRepository(context);
            leagueRepository = new LeagueRepository(context);
        }

        [HttpPost("lost")]
        public async Task<ActionResult> HandleLoss(Bet bet)
        {
            await betRepository.ChangeBetStatusToLost(bet);
            return Ok();
        }

        [HttpPost("won/{userId}")]
        public async Task<ActionResult> HandleWin(Bet bet, int userId)
        {
            await betRepository.ChangeBetStatusToWon(bet, userId);
            return Ok();
        }
    }
}
