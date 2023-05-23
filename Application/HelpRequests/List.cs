using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HelpRequests
{
    public class List
    {
        public class Query : IRequest<Result<List<HelpRequestDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<HelpRequestDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<HelpRequestDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var helpRequests = await _context.HelpRequests.ProjectTo<HelpRequestDto>(_mapper.ConfigurationProvider).ToListAsync();
                
                return Result<List<HelpRequestDto>>.Success(helpRequests);
            }
        }
    }
}
