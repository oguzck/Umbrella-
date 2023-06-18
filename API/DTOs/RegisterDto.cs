using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9.!?$]{8,16}$", ErrorMessage = "Password must be 8 to 16 characters long and can only contain letters, numbers, '.', '!', '?', and '$'.")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        public string UserName { get; set; }
    }
}