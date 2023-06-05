using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    var organization = await _context.Organizations.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                    if (organization == null)
                    {
                        return null;
                    }
                    var photoUploadResult2 = await _photoAccessor.AddPhoto(request.File);
                    var photo2 = new Photo
                    {
                        Url = photoUploadResult2.Url,
                        Id = photoUploadResult2.PublicId
                    };
                    if (!organization.Photos.Any(x => x.IsMain))
                    {
                        photo2.IsMain = true;
                    }
                    organization.Photos.Add(photo2);
                    var result2 = await _context.SaveChangesAsync() > 0;
                    if (result2)
                    {
                        return Result<Photo>.Success(photo2);
                    }
                    return Result<Photo>.Failure("Problem occured adding photo");


                }
                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }
                user.Photos.Add(photo);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Result<Photo>.Success(photo);
                }
                return Result<Photo>.Failure("Problem occured adding photo");
            }
        }
    }
}