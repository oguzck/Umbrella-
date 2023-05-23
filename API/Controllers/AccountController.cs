using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public UserManager<AppUser> _userManager { get; }
        private readonly TokenService _tokenService;
        private readonly UserManager<AppOrganization> _userManager2;

        public AccountController(UserManager<AppUser> userManager, UserManager<AppOrganization> userManager2, TokenService tokenService)
        {
            _userManager2 = userManager2;
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                var userRole = await _userManager.GetRolesAsync(user);
                if (!userRole.Contains("User"))
                {
                    return Forbid();
                }
                return CreateUserObject(user);
            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                return CreateUserObject(user);
            }
            return BadRequest(result.Errors);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user is null)
            {
                var user2 = await _userManager2.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
                return CreateOrganizationObject(user2);
            }
            else
            {
                var role = await _userManager.GetRolesAsync(user);
                return CreateUserObject(user);
            }


        }
        private UserDto CreateUserObject(AppUser user)
        {
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName,
                    isUser = true

                };
            }

        }
        private UserDto CreateOrganizationObject(AppOrganization organization)
        {
            return new UserDto
            {
                DisplayName = organization.DisplayName,
                Image = organization?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateTokenOrg(organization),
                UserName = organization.UserName,
                isUser = false
            };
        }
    }
}