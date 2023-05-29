using Application.Activities;
using Application.Comments;
using Application.HelpRequests;
using Application.JobAdversitements;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<HelpRequest, HelpRequestDto>()
               .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
               .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
               .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
               .ForMember(d => d.OrganizationName, o => o.MapFrom(s => s.RelatedOrganization.DisplayName))
               .ForMember(d => d.Email, o => o.MapFrom(s => s.Author.Email));

            CreateMap<JobAdver, JobAdverDto>()
                        .ForMember(d=>d.OrganizationName,o=>o.MapFrom(s=>s.organization.DisplayName));

             CreateMap<JobApplications, JobApplicationsDto>()
                            .ForMember(d=>d.ApplicantImage ,o=>o.MapFrom(s=>s.Applicant.Photos.FirstOrDefault(x => x.IsMain).Url))
                            .ForMember(d=>d.ApplicantName ,o=>o.MapFrom(s=>s.Applicant.DisplayName))
                            .ForMember(d=>d.ApplicantUsername ,o=>o.MapFrom(s=>s.Applicant.UserName));
                            

            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>().ForMember(d => d.HostUsername, o => o
            .MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));




            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));




            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}



