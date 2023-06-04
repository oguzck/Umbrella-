using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class JobAdver
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public DateTime Date  { get; set; }
        public DateTime ExpiringDate { get; set; }
        public string Description { get; set; } 
        public string Skills { get; set; }
        public bool isActive { get; set; }
        public bool isPaid { get; set; }
        public AppOrganization organization { get; set; }
        public ICollection<JobApplications> Applications { get; set; } = new List<JobApplications>();
    }
}