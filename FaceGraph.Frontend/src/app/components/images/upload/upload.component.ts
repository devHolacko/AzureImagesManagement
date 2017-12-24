import { OnInit, ElementRef, Component, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'toastr-ng2'
import { Router } from '@angular/router'

import { HelperService } from '../../../shared/services/helper.service';
import { ImagesService } from '../../../shared/services/images.service'
import { LoaderService } from '../../../shared/services/loader.service'
import { Route } from '@angular/router/src/config';
import { IUploadFile } from '../../../shared/interfaces/IUploadFile'
import { resetFakeAsyncZone } from '@angular/core/testing';
@Component({
  selector: 'create-invoice',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadImageComponent implements OnInit {
  image: any;

  constructor(private helper: HelperService, private imageService: ImagesService, private toastr: ToastrService, private loader: LoaderService, private router: Router) {

  }
  ngOnInit() {

  }



  changeListener($event): void {
    this.loader.show();
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      var imageData = this.image.substr(0, this.image.indexOf(',') + 1);
      var data: IUploadFile = {
        imageString: this.image.replace(imageData, ""),
        fileName: file.name
      }

      this.submitImage(data);

    }
    myReader.readAsDataURL(file);

  }

  submitImage(data: IUploadFile) {
    this.imageService.upload(data).subscribe(result => {
      this.loader.hide();
      if (!result.Success)
        this.toastr.warning("Upload Image", result.Message);
      this.toastr.success("Upload Image", result.Message)
      this.router.navigateByUrl('/list');
    }, err => {
      this.loader.hide();
      this.toastr.error("Upload Image", "An error occured");
      console.log(err);
    }, () => {
      this.loader.hide();
    });
  }

}