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
        private readonly MatchRepository matchRepository;

        public MatchApprovalController(DataContext context)
        {
            betRepository = new BetRepository(context);
            leagueRepository = new LeagueRepository(context);
            matchRepository = new MatchRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Match>>> Get()
        {
            var match = await matchRepository.GetAllMatches();
            return Ok(await matchRepository.GetAllMatches());
        }

        [HttpPost("lost")]
        public async Task<ActionResult> HandleLoss(Bet bet)
        {
            await betRepository.ChangeBetStatusToLost(bet);
            return Ok();
        }

        [HttpPost("won")]
        public async Task<ActionResult> HandleWin(Bet bet)
        {
            await betRepository.ChangeBetStatusToWon(bet);

            var usersWhoWon = await betRepository.GetWinnersLeagueIds(bet);
            foreach (var userWhoWon in usersWhoWon)
            {
                var leagueMember = await leagueRepository.GetLeagueMemberById(userWhoWon);
                if (leagueMember == null) return NotFound();

                await leagueRepository.UpdateWinnersBalance(leagueMember, bet);
            }
            return Ok();
        }
    }
}
