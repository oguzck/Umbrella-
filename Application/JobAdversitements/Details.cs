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

namespace Application.JobAdversitements
{
    public class Details
    {
        
        public class Query:IRequest<Result<JobAdverDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<JobAdverDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context,IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
                
            }
            public async Task<Result<JobAdverDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _context.JobAdversitements.ProjectTo<JobAdverDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x=>x.Id == request.Id);
                return Result<JobAdverDto>.Success(job);
            }
        }
    }
}