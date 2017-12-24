using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FaceGrpah.Api.Models
{
    public class PagingData
    {
        public int SkipCount { get; set; }
        public int PageSize { get; set; }
    }
}