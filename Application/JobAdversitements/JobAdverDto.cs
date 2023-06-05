using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.JobAdversitements
{
    public class JobAdverDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public DateTime Date { get; set; }
        public DateTime ExpiringDate { get; set; }
        public string Description { get; set; }
        public string Skills { get; set; }
        public bool isActive { get; set; }
        public bool isPaid { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationUserName { get; set; }
        public string OrganizationImage { get; set; }
        public ICollection<JobApplicationsDto> Applications { get; set; } 
    }
}