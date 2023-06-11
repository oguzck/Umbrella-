using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobAdversitements;
using Domain;

namespace Application.OrganizationProfiles
{
    public class OrganizationProfile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string DonationIban { get; set; }
        public string DonationDescription { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<JobAdverDto> JobAdversitements { get; set; }
        public string ContactEmail  { get; set; }
        public string PhoneNumber { get; set; }
    }
}