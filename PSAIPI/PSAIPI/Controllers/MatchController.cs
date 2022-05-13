using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly MatchRepository matchRepository;

        public MatchController(DataContext context)
        {
            matchRepository = new MatchRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Match>>> Get()
        {
            var match = await matchRepository.GetAllMatches();
            return Ok(await matchRepository.GetAllMatches());
        }

        /*[HttpGet("{id}")]
        public async Task<ActionResult<Match>> Get(int id)
        {
            var match = await matchRepository.GetMatchById(id);
            if (match == null)
                return BadRequest("Match not found");
            return Ok(match);
        }*/

        [HttpPost]
        public async Task<ActionResult<int>> AddMatch(MatchPayload matches)
        {
            var test = "Test";
            var id = await matchRepository.Add(matches.Matches);
            return Ok(1);
        }
    }
}
