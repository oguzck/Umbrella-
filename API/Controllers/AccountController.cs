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
using Infrastructure.Email;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

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
        private readonly SignInManager<AppUser> _signInManager;
        private readonly EmailSender _emailSender;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, UserManager<AppOrganization> userManager2, TokenService tokenService, EmailSender emailSender)
        {
            _emailSender = emailSender;
            _signInManager = signInManager;
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
                return Unauthorized("Invalid Email");
            }
            if (!user.EmailConfirmed) return Unauthorized("Email Not Confirmed");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
              
                return CreateUserObject(user);
            }
            return Unauthorized("Invalid password");
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
            if (!result.Succeeded) return BadRequest("Problem registering user ");

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href ='{verifyUrl}'>Click to verify email</a></p>";
            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);
            return Ok("Registration success-please verify email");
        }
        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Unauthorized();
            }
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (!result.Succeeded)
            {
                return BadRequest("Could not verify email adress");
            }
            return Ok("Email confirmed - you can now login");

        }
        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null) return Unauthorized();

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href ='{verifyUrl}'>Click to verify email</a></p>";
            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);
            return Ok("Email verification link resend");
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