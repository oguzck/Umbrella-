using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrganizationProfiles
{
    public class Details
    {
        public class Query : IRequest<Result<OrganizationProfile>>
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<OrganizationProfile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<OrganizationProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var organization = await _context.Organizations.ProjectTo<OrganizationProfile>(_mapper.ConfigurationProvider, new{currentUsername = _userAccessor.GetUsername()} ).SingleOrDefaultAsync(x => x.Username == request.Username);
                return Result<OrganizationProfile>.Success(organization);
            }
        }
    }
}