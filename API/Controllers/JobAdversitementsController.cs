using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobAdversitements;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobAdversitementsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateJobAdversitement(JobAdver jobAdversitement)
        {
            return HandleResult(await Mediator.Send(new Create.Command { JobAdver = jobAdversitement }));
        }
        [HttpGet]
        public async Task<IActionResult> GetJobAdversitements()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPost("{id}/apply")]
        public async Task<IActionResult> ApplyForJob(Guid id, [FromBody] JobApplications jobApplication)
        {
            var command = new ApplyJob.Command
            {
                Id = id,
                JobApplications = jobApplication
            };

            var result = await Mediator.Send(command);

            if (result.IsSuccess)
                return Ok();

            return BadRequest(result.Error);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobAdversitement(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }

}