import { OnInit, Component } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'toastr-ng2'

import { ImagesService } from '../../../shared/services/images.service'
import { LoaderService } from '../../../shared/services/loader.service'
import { IListPaging } from '../../../shared/interfaces/IListPaging'
import { resetFakeAsyncZone } from '@angular/core/testing';
import { IUploadFile } from '../../../shared/interfaces/IUploadFile';

@Component({
    selector: 'list-invoice',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListImagesComponent implements OnInit {

    pageSize: number = 10;
    pageNumber: number = 0;
    totalPages: number = 0;
    paging: IListPaging;
    arrImages: string[];
    imageToDelete: string;

    constructor(private toastr: ToastrService, private modalService: NgbModal, private imageService: ImagesService, private loader: LoaderService) {

    }
    ngOnInit() {
        var pagingData: IListPaging = {
            PageSize: this.pageSize,
            SkipCount: this.pageSize * this.pageNumber
        }
        this.loader.show();
        this.imageService.listImages(pagingData).subscribe(result => {
            this.loader.hide();
            this.arrImages = result.Data;
        }, err => {
            this.loader.hide();
            this.toastr.error("List Images", "An error occured");
        }, () => {
            this.loader.hide();
        });
    }

    refreshData() {
        var pagingData: IListPaging = {
            PageSize: this.pageSize,
            SkipCount: this.pageSize * this.pageNumber
        }
        this.loader.show();
        this.imageService.listImages(pagingData).subscribe(result => {
            this.loader.hide();
            this.arrImages = result.Data;
        }, err => {
            this.loader.hide();
            this.toastr.error("List Images", "An error occured");
        }, () => {
            this.loader.hide();
        });
    }

    open(content, image: string) {
        this.imageToDelete = image;
        this.modalService.open(content).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;

            if (result == 'delete') {
                this.deleteImage();
            }
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //console.log(this.closeResult);
        });
    }



    deleteImage() {
        this.loader.show();
        var dataToPut: IUploadFile = {
            fileName: this.imageToDelete,
            imageString: ""
        }
        this.imageService.deleteImage(dataToPut).subscribe(result => {
            this.loader.hide();
            if (!result.Success)
                this.toastr.warning("Delete Image", result.Message);
            this.toastr.success("Delete Image", "Deleted successfully");
            this.refreshData();
        }, err => {
            this.loader.hide();
            this.toastr.error("Delete Image", "An error occured");
        }, () => {
            this.loader.hide();
        });
    }

    isEnabled(buttonName): boolean {
        var isEnabled = false;
        switch (buttonName) {
            case "LastPage":
                if (this.totalPages == null || this.totalPages == this.pageNumber || this.totalPages == 0)
                    isEnabled = false;
                else
                    isEnabled = true;
                break;

            case "FirstPage":
                if (this.pageNumber == 1)
                    isEnabled = false;
                else
                    isEnabled = true;
                break;
            case "NextPage":
                if (this.totalPages <= this.pageNumber)
                    isEnabled = false;
                else
                    isEnabled = true;
                break;
            case "PreviousPage":
                if (this.pageNumber > 1)
                    isEnabled = true;
                else
                    isEnabled = false;
                break;
            case "PageSearch":
                if (this.totalPages < 2)
                    isEnabled = false;
                else
                    isEnabled = true;
            default:
                isEnabled = false;
                break;
        }

        return isEnabled;
    }

    changePage(type: string) {
        switch (type) {
            case "Next":
                this.pageNumber = this.pageNumber + 1;
                break;
            case "Previous":
                this.pageNumber = this.pageNumber - 1;
                break;
            case "First":
                this.pageNumber = 1;
                break;
            case "Last":
                this.pageNumber = this.totalPages;
            default:
                this.pageNumber = this.pageNumber;
                break;
        }
        this.paging.SkipCount = this.pageNumber * this.pageSize;
        //this.getFilteredInvoices();
    }

}