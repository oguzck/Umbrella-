using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int stausCode, string message, string details=null)
        {
            StausCode = stausCode;
            Message = message;
            Details = details;
        }

        public int StausCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}