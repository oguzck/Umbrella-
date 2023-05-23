using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.HelpRequests
{
    public class HelpRequestDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; } = false;
        public string Email { get; set; }
         public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string OrganizationName { get; set; }
        
    }
}