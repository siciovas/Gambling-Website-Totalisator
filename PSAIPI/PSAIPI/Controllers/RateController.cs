using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RateController : ControllerBase
    {
        private readonly RateRepository rateRepository;

        public RateController(DataContext context)
        {
            rateRepository = new RateRepository(context);
        }

        [HttpPost]
        public async Task<ActionResult> AddRate(Help_rating rating)
        {
            if(rating.Rating == string.Empty)
            {
                return BadRequest("Message cannot be empty");
            }
            var id = await rateRepository.Add(rating);
            if (id != 0)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
    }
}
