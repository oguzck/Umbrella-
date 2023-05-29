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

namespace Application.JobAdversitements
{
    public class List
    {
       
        public class Query : IRequest<Result<List<JobAdverDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobAdverDto>>>
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
            public async Task<Result<List<JobAdverDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.JobAdversitements.ProjectTo<JobAdverDto>(_mapper.ConfigurationProvider).ToListAsync();
               
                return Result<List<JobAdverDto>>.Success(jobs);
            }
        } 
    }
}