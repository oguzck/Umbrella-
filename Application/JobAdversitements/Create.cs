using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobAdversitements
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public JobAdver JobAdver { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.JobAdver).SetValidator(new JaValidator());
            }
        }
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
                var user = await _context.Organizations.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if(user==null){
                    return Result<Unit>.Failure("Faliure to create Job Adversitement");
                }
                
                var adversitement = new JobAdver
                {
                    Title = request.JobAdver.Title,
                    Date = DateTime.Now,
                    City = request.JobAdver.City,
                    ExpiringDate = DateTime.Now.AddDays(30),
                    Description = request.JobAdver.Description,
                    Skills = request.JobAdver.Skills,
                    isActive = true,
                    isPaid = request.JobAdver.isPaid,
                    organization = user


                };

                _context.JobAdversitements.Add(adversitement);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Faliure to create Job Adversitement");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}