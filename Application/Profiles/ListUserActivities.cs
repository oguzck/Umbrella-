using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListUserActivities
    {
         public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query = _context.ActivityAttendee.Where(x=>x.AppUser.UserName==request.Username).OrderBy(a=>a.Activity.Date).ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider).AsQueryable();

                query = request.Predicate switch{
                    "past" => query.Where(a=>a.Date<=DateTime.UtcNow),
                    "hosting" => query.Where(a=>a.HostUsername==request.Username),
                    _ => query.Where(a=>a.Date>=DateTime.UtcNow),
                };
                var userActivities = await query.ToListAsync();
                return Result<List<UserActivityDto>>.Success(userActivities);
            }
        }
    }
}