using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController:ControllerBase
    {
        private readonly UserRepository userRepository;

        public LoginController(DataContext context)
        {
            userRepository = new UserRepository(context);
        }

        [HttpPost]
        public async Task<ActionResult<LoginSucceed>> Login(LoginPayload userPayload)
        {
            var user = await userRepository.GetUserByEmail(userPayload.Email);

            if (user != null)
            {
  
                if (user.Password == userPayload.Password)
                {
                    var userLoggedPayload = new LoginSucceed
                    {
                        Id = user.Id,
                        RoleId = (int)user.Role,
                        LeagueMemberId = user.LeagueMember?.Id
                    };
                    return Ok(userLoggedPayload);
                }

            }

            return Unauthorized("Wrong login");
        }
    }
}
