using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HelpRequests
{
    public class ActiveToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid HelpRequestId { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var organization = await _context.Organizations
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var helpRequest = await _context.HelpRequests.FindAsync(request.HelpRequestId);
                if (helpRequest == null)
                    return Result<Unit>.Failure("Help request not found");

                if (helpRequest.RelatedOrganization == null)
                {
                    // Take the help request into progress
                    helpRequest.RelatedOrganization = organization;
                    helpRequest.isActive = true;
                }
                else
                {
                    // Mark the help request as inactive
                    helpRequest.RelatedOrganization = null;
                    helpRequest.isActive = false;
                }

                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Unit>.Failure("Failed to update Help Request");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
