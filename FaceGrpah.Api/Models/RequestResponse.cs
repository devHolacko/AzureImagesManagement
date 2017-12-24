using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FaceGrpah.Api.Models
{
    public class RequestResponse<T> where T : class
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<T> Data { get; set; }
    }
}