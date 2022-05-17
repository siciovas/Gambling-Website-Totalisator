using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;
using PSAIPI.Helper;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly UserRepository userRepository;

        public PasswordResetController(DataContext context)
        {
            userRepository = new UserRepository(context);
        }

        [HttpPost]
        public async Task<ActionResult> Reset(string email)
        {
            User user = await userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return BadRequest("Impossible to send password");
            }

            PasswordReset.HandlePasswordReset(user);
            return Ok();
            
        }



    }
}
