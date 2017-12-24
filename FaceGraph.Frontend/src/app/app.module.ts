import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { ToastrModule } from 'toastr-ng2';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component'
import { LoaderService } from './shared/services/loader.service'
import { AppRoutingModule } from './app-routing.module'
import { HelperService } from './shared/services/helper.service'
import { AppLinks } from './shared/resources/links.resources'
import { AppMessages } from './shared/resources/messages.resources'
import { ListImagesComponent } from './components/images/list/list.component'
import { UploadImageComponent } from './components/images/upload/upload.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ImagesService } from './shared/services/images.service'

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ListImagesComponent,
    UploadImageComponent,
    NotFoundComponent
  ],
  exports: [LoadingComponent, BrowserModule, BrowserAnimationsModule],
  imports: [
    AppRoutingModule,
    ToastrModule.forRoot(),
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
    HttpModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoaderService, HelperService, ImagesService, AppLinks],
  bootstrap: [AppComponent]
})
export class AppModule { }
