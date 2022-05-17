using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly LeagueRepository leagueRepository;

        public LeagueController(DataContext context)
        {
            leagueRepository = new LeagueRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<League>>> Get()
        {
            return Ok(await leagueRepository.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<League>> Get(int id)
        {
            var league = await leagueRepository.GetLeagueById(id);
            if (league == null)
                return BadRequest("League not found");
            return Ok(league);
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddLeague(League league)
        {

            var allLeagues = await leagueRepository.GetAll();
            var existingLeague = allLeagues.Find(l => l.Title == league.Title);
            if (existingLeague == null)
            {
                var leagueId = await leagueRepository.Add(league);

                return Ok(leagueId);
            }
            else
            {
                return Conflict("League is already exists");
            }
        }

        [HttpPut]
        public async Task<ActionResult<int>> EditLeague(League request)
        {

            var allLeagues = await leagueRepository.GetAll();
            var editingLeague = allLeagues.Find(l => l.Id == request.Id);

            if (editingLeague.Title == request.Title)
            {
                var leagueId = await leagueRepository.Edit(request);

                return Ok(leagueId);
            }
            else
            {
                var existingLeague = allLeagues.Find(l => l.Title == request.Title);
                if (existingLeague == null)
                {
                    var leagueId = await leagueRepository.Edit(request);

                    return Ok(leagueId);

                }
                return Conflict("League is already exists");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<League>>> Delete(int id)
        {
            await leagueRepository.Delete(id);

            return Ok(await leagueRepository.GetAll());
        }

        [Route("[action]/{userID}/{leagueID}")]
        [HttpPost]
        public async Task<ActionResult<int>> JoinLeague(int userID, int leagueID)
        {
            var member = await leagueRepository.GetMemberById(userID);
            if (member == null)
            {
                var id = await leagueRepository.AddUserToLeague(userID, leagueID);
                return Ok(id);
            }
            return Conflict("User already has league");
        }

        [HttpGet("members/{leagueID}")]
        public async Task<ActionResult<List<League_member>>> GetLeagueMembers(int leagueID)
        {
            return await leagueRepository.GetLeagueMembers(leagueID);
        }

        [HttpGet("members/{leagueID}/{userId}")]
        public async Task<ActionResult<League>> Get(int leagueId, int userId)
        {
            var league = await leagueRepository.GetLeagueById(leagueId);
            if (league is null)
            {
                return BadRequest("League not found");
            }

            var leagueMember = leagueRepository.GetMemberById(userId);
            if (leagueMember is null)
            {
                return BadRequest("League member not found");
            }
            return Ok(leagueMember);
        }
    }
}
