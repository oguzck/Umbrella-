using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.JobAdversitements
{
    public class JaValidator : AbstractValidator<JobAdver>
    {
        public JaValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x=>x.Date).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Skills).NotEmpty();
            RuleFor(x => x.isPaid).NotEmpty();

        }
    }
}