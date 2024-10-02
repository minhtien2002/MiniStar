using Microsoft.AspNetCore.Mvc;
using UserServices.Interface;
using UserViewModel;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var response = await _userService.GetUserById(id);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] UserRegisterViewModel user)
        {
            var newUser = await _userService.RegisterUser(user);
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginViewModel loginInfo)
        {
            var user = await _userService.Login(loginInfo);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] UserUpdateViewModel updatedUser)
        {
            var user = await _userService.UpdateUser(id, updatedUser);
            return Ok(user);
        }
        [HttpPost("{id}/verify-email")]
        public async Task<ActionResult> VerifyEmail(int id)
        {
            var result = await _userService.VerifyEmail(id);
            if (!result)
            {
                return NotFound("User not found or email verification failed");
            }
            return Ok("Email verified successfully");
        }

    }
}
