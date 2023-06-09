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
        public async Task<IActionResult> CreateHelpRequest(HelpRequest helpRequest)
        {
            return HandleResult(await Mediator.Send(new Create.Command { HelpRequest = helpRequest }));
        }

        [HttpGet]
        public async Task<IActionResult> GetHelpRequests()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost("{helpRequestId}/toggle")]
        public async Task<IActionResult> ToggleHelpRequestActivity(Guid helpRequestId)
        {
            return HandleResult(await Mediator.Send(new ActiveToggle.Command { HelpRequestId = helpRequestId }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHelpRequest(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
