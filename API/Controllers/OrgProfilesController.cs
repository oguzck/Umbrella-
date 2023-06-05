using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.OrganizationProfiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrgProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> getProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }
    }
}