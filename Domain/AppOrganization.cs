using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppOrganization : IdentityUser
    {
        public  string Description { get; set; }
        public  string DonationIban { get; set; }
    }
}