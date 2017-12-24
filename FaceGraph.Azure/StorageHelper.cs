using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FaceGraph.Azure
{
    public class StorageHelper : IDisposable
    {
        //Storage Account object to handle the clound storage
        CloudStorageAccount _storageAccount;
        //Blob Client object to deal with the blobs in the storage
        CloudBlobClient _blobClient;
        //Blob Container object to deal with the blob container
        CloudBlobContainer _container;
        //boolean to determine whether the Storage Helper is disposed or not
        private bool disposed = false;
        //Default constructor : Takes the container name to deal with blobs inside it
        public StorageHelper(string containerName = FaceGraphConsts.IMAGES_CONTAINER_NAME)
        {
            //Creating Storage Account through the given connection string set in the app settings section in the web config
            _storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting(FaceGraphConsts.STORAGE_CONNECTION_STRING_KEY));
            //Creating BlobClient instance
            _blobClient = _storageAccount.CreateCloudBlobClient();
            //Creating Container object using the given container name
            _container = _blobClient.GetContainerReference(containerName);
        }

        //Destructor to dispose the StorageHelper class
        ~StorageHelper()
        {
            //Calling the dispose function
            Dispose(false);
        }
        //Setting the container name in case there're multiple containers to deal with
        public void SetContainerName(string containerName)
        {
            //Getting the container
            _container = _blobClient.GetContainerReference(containerName);
        }
        //Getting list of blobs from the container
        public List<string> GetList(int skipCount, int take = 10)
        {
            return _container.ListBlobs(null, true).Skip(skipCount).Take(take).Select(b => $"{FaceGraphConsts.SERVER_URL}{b.Uri.AbsolutePath}").ToList();
        }

        //Deletign blob from the container using given blob name
        public bool Delete(string fileName)
        {
            var success = false;
            try
            {
                var storageImageName = fileName.Replace($"{FaceGraphConsts.SERVER_URL}/{FaceGraphConsts.IMAGES_CONTAINER_NAME}/", string.Empty);

                // Retrieve reference to a blob.
                CloudBlockBlob blockBlob = _container.GetBlockBlobReference(storageImageName);

                if (blockBlob != null)
                    // Delete the blob.
                    blockBlob.Delete();
                success = blockBlob != null;
            }
            catch (Exception)
            {
                success = false;
            }

            return success;
        }
        //Creating new blob in the container
        public void Create(string filePath)
        {
            //Getting the blob filename from the uploaded file path
            var fileName = Path.GetFileName(filePath);
            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = _container.GetBlockBlobReference(fileName);

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = File.OpenRead(filePath))
            {
                //Uploading the file to Azure
                blockBlob.UploadFromStream(fileStream);
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            //Checking if the StorageHelper is disposed or not
            if (!disposed)
            {
                if (disposing)
                {
                    // Manual release of managed resources.
                }
                else
                {
                    // Release unmanaged resources.
                    _storageAccount = null;
                    _blobClient = null;
                    _container = null;
                }

                disposed = true;
            }
        }
        //The IDisposable Dispose method
        void IDisposable.Dispose()
        {
            //Calling the dispose method to dispose class objects
            Dispose(true);
            //Finalizing the GarbageCollection
            GC.SuppressFinalize(this);
        }
    }
}
