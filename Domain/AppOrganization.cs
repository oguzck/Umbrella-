using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppOrganization : IdentityUser
    {
        public string  DisplayName { get; set; }
        public  string Description { get; set; }
        public  string DonationIban { get; set; }
        public string DonationDescription { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<JobAdver> JobAdversitements { get; set; }
    }
}