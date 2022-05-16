using Microsoft.AspNetCore.Mvc;
using PSAIPI.Data;
using PSAIPI.Models;
using PSAIPI.Payloads;
using PSAIPI.Repositories;

namespace PSAIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController:ControllerBase
    {
        private readonly UserRepository userRepository;

        public RegisterController(DataContext context)
        {
            userRepository = new UserRepository(context);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Register(User user)
        {
            var allUsers = await userRepository.GetAllUsers();
            
            if (allUsers != null)
            {
                var existUser = allUsers.Where(x => x.Email == user.Email).FirstOrDefault();

                if (existUser != null)
                {
                    return Conflict("Email is already in use");
                }
               
            }

            var userId = await userRepository.CreateUser(user);

            return Ok(userId);
        }

    }
}
