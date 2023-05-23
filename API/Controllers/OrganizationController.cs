using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationController : ControllerBase
    {
        public UserManager<AppOrganization> _userManager { get; }
        private readonly TokenService _tokenService;

        public OrganizationController(UserManager<AppOrganization> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }
        [HttpPost("login")]
        public async Task<ActionResult<OrganizationDto>> Login(LoginDto loginDto)
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
                if (userRole.Contains("User"))
                {
                    return Forbid();
                }
                return CreateUserObject(user);
            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<OrganizationDto>> Register(RegisterDto registerDto)
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
            var user = new AppOrganization
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);

            }
            return BadRequest(result.Errors);
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<OrganizationDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);

        }
        private OrganizationDto CreateUserObject(AppOrganization organization)
        {
            return new OrganizationDto
            {
                DisplayName = organization.DisplayName,
                Image = organization?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateTokenOrg(organization),
                UserName = organization.UserName,
                
            };
        }
    }
}