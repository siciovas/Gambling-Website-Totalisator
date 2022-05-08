using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrizeController : ControllerBase
    {
        private readonly PrizeRepository prizeRepository;

        public PrizeController(DataContext context)
        {
            prizeRepository = new PrizeRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Prize>>> Get()
        {
            return Ok(await prizeRepository.GetAll());
        }
    }
}
