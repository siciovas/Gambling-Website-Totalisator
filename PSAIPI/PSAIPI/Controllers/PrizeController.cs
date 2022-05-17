using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrizeController : ControllerBase
    {
        private readonly PrizeRepository prizeRepository;
        private readonly LeagueRepository leagueRepository;

        public PrizeController(DataContext context)
        {
            prizeRepository = new PrizeRepository(context);
            leagueRepository = new LeagueRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Prize>>> Get()
        {
            return Ok(await prizeRepository.GetAllPrizes());
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<League>> GetLeagueMember(int userId)
        {
            var leagueMember = await leagueRepository.GetMemberById(userId);
            if (leagueMember is null)
            {
                return BadRequest("League member not found");
            }
            return Ok(leagueMember);
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult<League>> UpdateLeagueMembersBalance(UpdateUserBalancePayload payload)
        {
            var leagueMember = await leagueRepository.GetMemberById(payload.userId);
            if (leagueMember is null)
            {
                return BadRequest("League member not found");
            }
            await leagueRepository.RemoveAmountOfPoints(payload);
            return Ok();
        }
    }
}
