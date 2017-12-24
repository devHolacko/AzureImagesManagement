using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaceGraph.Azure
{
    public static class FaceGraphConsts
    {
        public const string STORAGE_CONNECTION_STRING_KEY = "StorageConnectionString";
        public const string IMAGES_CONTAINER_NAME = "images";
        public const string SUCCESS_MESSAGE = "Success";
        public const string ERROR_OCCURED_MESSAGE = "Error occured";
        public const string IMAGES_PATH = "~/Images/";
        public const string INVALID_FILE = "Please Upload image of type .jpg,.gif,.png.";
        public const string ERROR_KEY = "Error";
        public const string ERROR_MESSAGE_FORMAT = "An error occured : ";
        public const string VALID_BASE64REGEX = @"^[a-zA-Z0-9\+/]*={0,2}$";
        public const string SERVER_URL = "https://facegraphdevtest2.blob.core.windows.net";
        public const string INVALID_FILE_DATA = "Invalid file";
    }
}
