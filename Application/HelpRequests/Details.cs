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
    public class Details
    {
        public class Query:IRequest<Result<HelpRequestDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<HelpRequestDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context,IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
                
            }
            public async Task<Result<HelpRequestDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var helpRequest = await _context.HelpRequests.ProjectTo<HelpRequestDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x=>x.Id == request.Id);
                return Result<HelpRequestDto>.Success(helpRequest);
            }
        }
    }
}