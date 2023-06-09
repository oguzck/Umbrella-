using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendee { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<HelpRequest> HelpRequests { get; set; }

        public DbSet<AppOrganization> Organizations { get; set; }
        public DbSet<JobAdver> JobAdversitements { get; set; }
        public DbSet<JobApplications> Applications { get; set; }

        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));
            builder.Entity<ActivityAttendee>().HasOne(u => u.AppUser).WithMany(a => a.Activities).HasForeignKey(aa => aa.AppUserId);
            builder.Entity<ActivityAttendee>().HasOne(u => u.Activity).WithMany(a => a.Attendees).HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Comment>().HasOne(a => a.Activtiy).WithMany(c => c.Comments).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<HelpRequest>()
                            .HasOne(a => a.Author)
                            .WithMany(c => c.HelpRequests)
                            .OnDelete(DeleteBehavior.Cascade);

            
            builder.Entity<JobAdver>()
                            .HasOne(org=>org.organization)
                            .WithMany(c=>c.JobAdversitements)
                            .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<JobApplications>(x=>x.HasKey(a=>new{a.ApplicantId,a.JobId}));
            builder.Entity<JobApplications>().HasOne(u=>u.Applicant).WithMany(a=>a.Applications).HasForeignKey(a=>a.ApplicantId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<JobApplications>().HasOne(u=>u.JobAdversitement).WithMany(a=>a.Applications).HasForeignKey(a=>a.JobId).OnDelete(DeleteBehavior.Cascade);
                            
                         





            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });
                b.HasOne(o => o.Observer).WithMany(f => f.Followings)
                                        .HasForeignKey(o => o.ObserverId)
                                        .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target).WithMany(f => f.Followers)
                        .HasForeignKey(o => o.TargetId)
                        .OnDelete(DeleteBehavior.Cascade);
            });
        }

    }
}