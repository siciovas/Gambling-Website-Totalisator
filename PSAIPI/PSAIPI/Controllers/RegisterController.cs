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
    }
}
