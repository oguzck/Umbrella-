using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrganizationProfiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }
            public string Description{ get; set; }
            public string DonationIban { get; set; }
            public string DonationDescription { get; set; }
            public string PhoneNumber { get; set; }
        }
        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.DisplayName).NotEmpty();
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
                var user = await _context.Organizations.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null)
                {
                    return null;
                }
                user.Description = request.Description ?? user.Description;
                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.DonationIban = request.DonationIban ?? user.DonationIban;
                user.DonationDescription = request.DonationDescription ?? user.DonationDescription;
                user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
                _context.Entry(user).State = EntityState.Modified;
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to Update Profile");

                throw new NotImplementedException();
            }
        }
    }
}