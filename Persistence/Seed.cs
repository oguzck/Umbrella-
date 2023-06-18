using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager, UserManager<AppOrganization> orgManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any() && !roleManager.Roles.Any() && !orgManager.Users.Any())
            {
                var users = new List<AppUser>
                    {
                        new AppUser
                        {
                            DisplayName = "Bob",
                            UserName = "bob",
                            Email = "bob@test.com",
                            Bio = "Hey there! I'm Bob, a passionate software developer with a knack for creating innovative solutions. With several years of experience in the industry, I enjoy tackling complex problems and turning them into elegant software solutions. I have a strong foundation in various programming languages and frameworks, and I'm always eager to learn and explore new technologies. Apart from coding, I also love staying up to date with the latest tech trends and attending tech conferences to network with fellow enthusiasts. If you're looking for a dedicated and creative developer to join your team, I'm your guy!",
                        },
                        new AppUser
                        {
                            DisplayName = "Jane",
                            UserName = "jane",
                            Email = "jane@test.com",
                            Bio = "Hello! I'm Jane, an adventurous soul with a passion for exploring the world and pushing my limits. You'll often find me hiking through picturesque mountains, diving into the depths of the ocean, or capturing stunning landscapes through my camera lens. Nature has always been a great source of inspiration for me, and it reflects in my work as well. As a professional explorer, I've developed a keen eye for detail and a strong sense of adaptability. Whether it's navigating through challenging terrains or working on complex projects, I approach every endeavor with enthusiasm, creativity, and a willingness to learn. Let's connect and embark on exciting journeys together!",
                        },
                        new AppUser
                        {
                            DisplayName = "Tom",
                            UserName = "tom",
                            Email = "tom@test.com",
                            Bio = "Greetings! I'm Tom, a self-proclaimed coffee enthusiast, bookworm, and aspiring writer. When I'm not lost in the magical world of literature or brewing the perfect cup of coffee, you'll find me indulging in my passion for writing. I believe that words have the power to transform ideas into captivating stories that resonate with readers. Whether it's crafting engaging blog posts, creating compelling copy, or penning down my own novel, I immerse myself in the art of storytelling. I'm constantly honing my writing skills, exploring different genres, and seeking inspiration from both classic and contemporary works. If you're looking for a wordsmith to breathe life into your content, let's collaborate and weave stories that leave a lasting impact!",
                        },
                        new AppUser
                        {
                            DisplayName = "Oğuz Can Kılıçkaya",
                            UserName = "oguzck",
                            Email = "oguz@test.com",
                            Bio = "Greetings! I'm Oğuz Can, a self-proclaimed coffee enthusiast, bookworm, and aspiring writer. When I'm not lost in the magical world of literature or brewing the perfect cup of coffee, you'll find me indulging in my passion for writing. I believe that words have the power to transform ideas into captivating stories that resonate with readers. Whether it's crafting engaging blog posts, creating compelling copy, or penning down my own novel, I immerse myself in the art of storytelling. I'm constantly honing my writing skills, exploring different genres, and seeking inspiration from both classic and contemporary works. If you're looking for a wordsmith to breathe life into your content, let's collaborate and weave stories that leave a lasting impact!",
                        },
                    };

                var organizations = new List<AppOrganization>
                    {
                        new AppOrganization
                        {
                            DisplayName = "Afad",
                            UserName = "afad",
                            Email = "afad@test.com",
                            Description = "AFAD (Disaster and Emergency Management Authority) is a government agency responsible for coordinating disaster and emergency response efforts in Turkey. Our mission is to ensure the safety and well-being of citizens in times of natural or man-made disasters. We work closely with local authorities, humanitarian organizations, and international partners to provide effective emergency response, disaster management, and risk reduction measures.",
                            PhoneNumber="9036764273",
                            DonationDescription="Türkiye İş Bankası AFAD ",
                            DonationIban="TR890006278547128821865956"
                        },
                        new AppOrganization
                        {
                            DisplayName = "Kızılay",
                            UserName = "kizilay",
                            Email = "kizilay@test.com",
                            Description = "Kızılay, also known as the Turkish Red Crescent, is a humanitarian organization dedicated to providing emergency assistance, healthcare services, and social support to vulnerable individuals and communities in Turkey. Our mission is to alleviate human suffering, promote social welfare, and ensure the well-being of those in need. Through our network of volunteers, blood donation centers, and humanitarian aid programs, we strive to make a positive impact and build resilience in the face of adversity.",
                            PhoneNumber="5036344273",
                            DonationDescription="Ziraat Bankası KIZILAY ",
                            DonationIban="TR690006288174115989516866"
                        },
                        new AppOrganization
                        {
                            DisplayName = "İHH",
                            UserName = "ihh",
                            Email = "ihh@test.com",
                            Description = "İHH Humanitarian Relief Foundation is a non-profit organization committed to providing humanitarian aid and support to communities affected by conflicts, natural disasters, and poverty around the world. With a focus on emergency relief, healthcare, education, and sustainable development, we strive to make a lasting difference in the lives of people in need. Our dedicated team of volunteers and professionals work tirelessly to deliver essential services and promote the values of solidarity, compassion, and human dignity.",
                            PhoneNumber="3036764273",
                            DonationDescription="Garanti Bankası IHH ",
                            DonationIban="TR870006236935657699121713"
                        },
                    };

                var roles = new[] { "Admin", "Organization", "User" };
                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                }
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "User");

                }
                foreach (var organization in organizations)
                {
                    await orgManager.CreateAsync(organization, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "walking",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "charityEvent",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 3",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "gathering",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 4",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "visiting",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "visiting",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "walking",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "gathering",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "charityEvent",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "gathering",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "visiting",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "walking",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "walking",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 9 ",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "walking",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[3],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    }
                };
                var jobAdvers = new List<JobAdver>
                    {
                        new JobAdver
                        {
                            Id = Guid.NewGuid(),
                            Title = "Graphic Designer",
                            City = "Los Angeles",
                            Date = DateTime.Now,
                            ExpiringDate = DateTime.Now.AddDays(30),
                            Description = "We are seeking a talented Graphic Designer to join our creative team. As a Graphic Designer, you will be responsible for creating visually appealing designs, illustrations, and graphics for various marketing materials, websites, and social media platforms. Proficiency in Adobe Creative Suite, strong creativity, and attention to detail are essential for this role.",
                            Skills = "Adobe Creative Suite, Illustration, Typography, Attention to Detail",
                            isActive = true,
                            isPaid = true,
                            organization = organizations[0] // Use the first organization in the list
                        },
                        new JobAdver
                        {
                            Id = Guid.NewGuid(),
                            Title = "Data Analyst",
                            City = "Seattle",
                            Date = DateTime.Now,
                            ExpiringDate = DateTime.Now.AddDays(45),
                            Description = "We are hiring a Data Analyst to join our analytics team. The Data Analyst will be responsible for analyzing large datasets, generating reports, and providing insights to drive data-driven decision-making. Proficiency in SQL, Excel, and data visualization tools is required. Strong analytical thinking and problem-solving skills are essential for this role.",
                            Skills = "SQL, Excel, Data Analysis, Data Visualization",
                            isActive = true,
                            isPaid = false,
                            organization = organizations[1] // Use the second organization in the list
                        },
                        new JobAdver
                        {
                            Id = Guid.NewGuid(),
                            Title = "Front-End Developer",
                            City = "San Francisco",
                            Date = DateTime.Now,
                            ExpiringDate = DateTime.Now.AddDays(30),
                            Description = "We are looking for a skilled Front-End Developer to join our development team. The ideal candidate has experience in HTML, CSS, JavaScript, and modern front-end frameworks such as React or Angular. You will be responsible for designing and implementing user interfaces, collaborating with back-end developers, and ensuring high-performance and responsiveness of web applications.",
                            Skills = "HTML, CSS, JavaScript, React/Angular",
                            isActive = true,
                            isPaid = true,
                            organization = organizations[2] // Use the third organization in the list
                        },
                        new JobAdver
                        {
                            Id = Guid.NewGuid(),
                            Title = "Software Engineer",
                            City = "New York",
                            Date = DateTime.Now,
                            ExpiringDate = DateTime.Now.AddDays(30),
                            Description = "We are seeking a skilled Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software applications. The ideal candidate has experience in C#, .NET, and front-end technologies such as HTML, CSS, and JavaScript. Strong problem-solving skills and the ability to work collaboratively in a team environment are essential.",
                            Skills = "C#, .NET, HTML, CSS, JavaScript",
                            isActive=true,
                            isPaid = true,
                            organization = organizations[0] // Use the first organization in the list
                        },
                        new JobAdver
                        {
                            Id = Guid.NewGuid(),
                            Title = "Marketing Specialist",
                            City = "San Francisco",
                            Date = DateTime.Now,
                            ExpiringDate = DateTime.Now.AddDays(45),
                            Description = "We are seeking a talented Marketing Specialist to join our marketing team. In this role, you will be responsible for developing and executing marketing campaigns, managing social media presence, analyzing market trends, and generating innovative ideas to drive customer engagement. The ideal candidate has strong communication skills, a creative mindset, and a passion for delivering impactful marketing strategies.",
                            Skills = "Marketing strategy, Social media management, Market analysis",
                            isActive = true,
                            isPaid = false,
                            organization = organizations[1] // Use the second organization in the list
                        }
                    };
                var jobApplications = new List<JobApplications>
                    {
                        new JobApplications
                        {
                            Id = Guid.NewGuid(),
                            Applicant = users[0],
                            ApplicantId = users[0].Id,
                            JobAdversitement = jobAdvers[0],
                            JobId = jobAdvers[0].Id,
                            CoverLetter = "I'm excited about the opportunity and believe my skills and experience make me a strong candidate for this position. I have a solid background in software development and a proven track record of delivering high-quality solutions. I'm confident that I can contribute to the success of your team.",
                            EducationLevel = "Bachelor's Degree in Computer Science"
                        },
                        new JobApplications
                        {
                            Id = Guid.NewGuid(),
                            Applicant = users[1],
                            ApplicantId = users[1].Id,
                            JobAdversitement = jobAdvers[1],
                            JobId = jobAdvers[1].Id,
                            CoverLetter = "I'm passionate about marketing and have a deep understanding of industry trends. I'm particularly interested in this role as it aligns perfectly with my skills and career goals. I have successfully executed various marketing campaigns and have a strong track record of driving customer engagement. I believe I can make a significant impact on your organization's marketing efforts.",
                            EducationLevel = "Master's Degree in Marketing"
                        }
                    };
                var helpRequests = new List<HelpRequest>
                    {
                        new HelpRequest
                        {
                            Id = Guid.NewGuid(),
                            Title = "Volunteers Needed for Community Cleanup",
                            Date = DateTime.Now.AddDays(-7),
                            Description = "We are organizing a community cleanup event to help keep our neighborhood clean and beautiful. We need volunteers who are passionate about the environment and are willing to contribute their time and effort. Join us in making a positive impact on our community!",
                            isActive = true,
                            Author = users[0], // Assign an existing user as the author
                            RelatedOrganization = organizations[0], // Assign an existing organization related to the help request
                            ContactNumber = "123-456-7890",
                            Adress = "123 Main Street, City"
                        },
                        new HelpRequest
                        {
                            Id = Guid.NewGuid(),
                            Title = "Donations Needed for Homeless Shelter",
                            Date = DateTime.Now.AddDays(-14),
                            Description = "Our homeless shelter is in need of donations to provide essential supplies and support to those in need. Items such as blankets, warm clothing, toiletries, and non-perishable food items are greatly appreciated. Your generosity can make a significant difference in the lives of those experiencing homelessness.",
                            isActive = true,
                            Author = users[1], // Assign an existing user as the author
                            RelatedOrganization = organizations[1], // Assign an existing organization related to the help request
                            ContactNumber = "987-654-3210",
                            Adress = "456 Elm Street, City"
                        },
                        new HelpRequest
                        {
                            Id = Guid.NewGuid(),
                            Title = "Earthquake Incident",
                            Date = DateTime.Now.AddDays(-14),
                            Description = "Our homeless shelter is in need of donations to provide essential supplies and support to those in need. Items such as blankets, warm clothing, toiletries, and non-perishable food items are greatly appreciated. Your generosity can make a significant difference in the lives of those experiencing homelessness.",
                            isActive = false,
                            Author = users[1], // Assign an existing user as the author
                            ContactNumber = "987-654-3210",
                            Adress = "456 Test Street, City"
                        },
                        new HelpRequest
                        {
                            Id = Guid.NewGuid(),
                            Title = "Heavy Rain Incident",
                            Date = DateTime.Now.AddDays(-14),
                            Description = "Our homeless shelter is in need of donations to provide essential supplies and support to those in need. Items such as blankets, warm clothing, toiletries, and non-perishable food items are greatly appreciated. Your generosity can make a significant difference in the lives of those experiencing homelessness.",
                            isActive = false,
                            Author = users[3], // Assign an existing user as the author
                            ContactNumber = "987-654-3210",
                            Adress = "456 Test Street, City"
                        },
                    };

                await context.HelpRequests.AddRangeAsync(helpRequests);
                await context.JobAdversitements.AddRangeAsync(jobAdvers);
                await context.Activities.AddRangeAsync(activities);
                await context.Applications.AddRangeAsync(jobApplications);

                await context.SaveChangesAsync();
            }
        }
    }
}
