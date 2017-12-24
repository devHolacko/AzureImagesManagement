import { Injectable } from '@angular/core'

@Injectable()
export class AppLinks {
    private readonly baseUrl = "http://localhost:13920/api/";

    private readonly imagesModule = "Images/";

    private readonly uploadImage = "Upload";
    private readonly listAllImages = "GetImages";
    private readonly deleteImage = "Delete";

    getUploadImageLink(): string {
        return this.baseUrl + this.imagesModule + this.uploadImage;
    }

    getImagesList(): string {
        return this.baseUrl + this.imagesModule + this.listAllImages;
    }

    getDeleteImageLink(): string {
        return this.baseUrl + this.imagesModule + this.deleteImage;
    }
}