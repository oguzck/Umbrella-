using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HelpRequests
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HelpRequest HelpRequest { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.HelpRequest).SetValidator(new HelpRequestValidator());
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                    return Result<Unit>.Failure("User not found");

                var helpRequest = new HelpRequest
                {
                    Title = request.HelpRequest.Title,
                    Date = DateTime.Now,
                    Description = request.HelpRequest.Description,
                    ContactNumber = request.HelpRequest.ContactNumber,
                    Adress=request.HelpRequest.Adress,
                    isActive = false,
                    Author = user
                };

                _context.HelpRequests.Add(helpRequest);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create help request");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
