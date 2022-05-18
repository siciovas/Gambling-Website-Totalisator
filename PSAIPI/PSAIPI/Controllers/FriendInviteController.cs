using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendInviteController : ControllerBase
    {
        private readonly FriendInviteRepository friendInviteRepository;

        public FriendInviteController(DataContext context)
        {
            friendInviteRepository = new FriendInviteRepository(context);
        }

        [HttpPost]
        public async Task<ActionResult> SaveUrl(LeagueInvitation leagueInvitation)
        {
            _ = await friendInviteRepository.SaveUrl(leagueInvitation);
            return Ok();
        }
    }
}
