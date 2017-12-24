import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { RequestOptions } from '@angular/http'

import { IRequestResponse } from '../interfaces/IRequestResponse'
import { IListPaging } from '../interfaces/IListPaging'
import { MainService } from '../services/main.service'
import { HelperService } from '../services/helper.service'
import { AppLinks } from '../resources/links.resources'
import { IUploadFile } from '../interfaces/IUploadFile'

@Injectable()
export class ImagesService extends MainService {
    constructor(protected http: Http, protected helper: HelperService, protected links: AppLinks) {
        super(http, helper, links);
    }

    upload(files): Observable<IRequestResponse<any>> {
        return this.http.post(this.links.getUploadImageLink(), this.helper.objectToUrl(files).substring(1).trim(), this.options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));

    }

    listImages(pagingData: any): Observable<IRequestResponse<any>> {
        return this.http
            .post(this.links.getImagesList(), this.helper.objectToUrl(pagingData).substring(1).trim(), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteImage(imageToDelete: IUploadFile): Observable<IRequestResponse<any>> {
        return this.http
            .put(this.links.getDeleteImageLink(), this.helper.objectToUrl(imageToDelete).substring(1).trim(), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

}