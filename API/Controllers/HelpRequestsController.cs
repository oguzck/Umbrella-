using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.HelpRequests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HelpRequestsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateHelpRequest(HelpRequest HelpRequest)
        {
            return HandleResult(await Mediator.Send(new Create.Command { HelpRequest = HelpRequest }));
        }
    }
}