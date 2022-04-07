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
            } else
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
            } else
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
    }
}
