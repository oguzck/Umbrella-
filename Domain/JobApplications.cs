using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class JobApplications
    {
        public Guid Id { get; set; }  
        public AppUser Applicant { get; set; }
        public string ApplicantId { get; set; }
        public JobAdver JobAdversitement { get; set; }
        public Guid JobId{ get; set; } 
        public string CoverLetter { get; set; }
        public string EducationLevel { get; set; }



    }
}