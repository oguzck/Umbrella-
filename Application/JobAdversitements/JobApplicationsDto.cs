using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.JobAdversitements
{
    public class JobApplicationsDto
    {
        public Guid Id { get; set; }  
        public string ApplicantName { get; set; }
        public string ApplicantImage { get; set; }
        public string ApplicantUsername { get; set; }
        public string CoverLetter { get; set; }
        public string EducationLevel { get; set; }
    }
}