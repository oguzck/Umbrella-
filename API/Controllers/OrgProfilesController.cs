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
        [HttpGet]
        public async Task<IActionResult> ListOrganizations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}