using FaceGraph.Azure;
using FaceGrpah.Api.Models;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static System.Net.Mime.MediaTypeNames;

namespace FaceGrpah.Api.Controllers
{
    public class ImagesController : ApiController
    {
        private readonly StorageHelper _storageHelper;
        public ImagesController()
        {
            _storageHelper = new StorageHelper();
        }

        [Route("api/Images/GetImages")]
        [HttpPost, AllowAnonymous]
        public RequestResponse<string> GetImages([FromBody]PagingData pagingData)
        {
            var lstImages = _storageHelper.GetList(pagingData.SkipCount, pagingData.PageSize).ToList();
            return new RequestResponse<string> { Data = lstImages, Success = true, Message = FaceGraphConsts.SUCCESS_MESSAGE };
        }

        [Route("api/Images/Delete")]
        [HttpPut, AllowAnonymous]
        public RequestResponse<object> Delete([FromBody]UploadImage fileUrl)
        {
            var result = _storageHelper.Delete(fileUrl.FileName);
            return new RequestResponse<object> { Success = result, Message = result ? FaceGraphConsts.SUCCESS_MESSAGE : FaceGraphConsts.ERROR_OCCURED_MESSAGE };
        }

        [Route("api/Images/Upload")]
        [HttpPost, AllowAnonymous]
        public RequestResponse<object> Upload([FromBody]UploadImage imageData)
        {
            if (imageData == null || string.IsNullOrEmpty(imageData.ImageString))
                return new RequestResponse<object> { Success = false, Message = FaceGraphConsts.INVALID_FILE, Data = null };
            if (imageData.ImageString.Length % 4 != 0 || imageData.ImageString.Contains(" ") || imageData.ImageString.Contains("\t")
                || imageData.ImageString.Contains("\r") || imageData.ImageString.Contains("\n"))
                return new RequestResponse<object> { Success = false, Message = FaceGraphConsts.INVALID_FILE_DATA, Data = null };

            var bytes = Convert.FromBase64String(imageData.ImageString);
            var imagesPath = HttpContext.Current.Server.MapPath(FaceGraphConsts.IMAGES_PATH);
            Directory.CreateDirectory(imagesPath);
            var fileFullPath = $"{imagesPath}/{Guid.NewGuid()}{imageData.FileName}".Trim();
            using (var imageFile = new FileStream(fileFullPath, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            _storageHelper.Create(fileFullPath);
            return new RequestResponse<object> { Success = true, Message = FaceGraphConsts.SUCCESS_MESSAGE, Data = null };
        }

    }
}