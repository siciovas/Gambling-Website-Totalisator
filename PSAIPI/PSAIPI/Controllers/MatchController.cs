using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : Controller
    {
        private readonly MatchRepository matchRepository;

        public MatchController(DataContext context)
        {
            matchRepository = new MatchRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Match>>> Get()
        {
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
            var id = matchRepository.Add(matches.Matches);
            return Ok(1);
        }
    }
}
