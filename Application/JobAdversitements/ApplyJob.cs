using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobAdversitements
{
    public class ApplyJob
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public JobApplications JobApplications { get; set; }
        }
        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.JobAdver).SetValidator(new JaValidator());
        //     }
        // }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.JobAdversitements.SingleOrDefaultAsync(x => x.Id == request.Id);
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null)
                    return Result<Unit>.Failure("user not found");
                if (job == null)
                    return Result<Unit>.Failure("Job advertisement not found");

                var existingApplication = await _context.Applications
                        .FirstOrDefaultAsync(x => x.JobId == job.Id && x.ApplicantId == user.Id);

                if (existingApplication != null)
                    return Result<Unit>.Failure("You have already applied for this job");

                var application = new JobApplications
                {
                    Id = Guid.NewGuid(), // Generate a new unique ID for the application
                    Applicant = user,
                    JobAdversitement = job,
                    CoverLetter = request.JobApplications.CoverLetter,
                    EducationLevel = request.JobApplications.EducationLevel
                };

                job.Applications.Add(application);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to create job application");
            }
        }
    }
}