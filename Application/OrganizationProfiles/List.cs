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
    public class List
    {
        public class Query : IRequest<Result<List<OrganizationProfile>>> { }

        public class Handler : IRequestHandler<Query, Result<List<OrganizationProfile>>>
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
            public async Task<Result<List<OrganizationProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var organizations = await _context.Organizations
                .ProjectTo<OrganizationProfile>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<OrganizationProfile>>.Success(organizations);
            }
        }
    }
}