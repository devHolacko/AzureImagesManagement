import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListImagesComponent } from './components/images/list/list.component'
import { UploadImageComponent } from './components/images/upload/upload.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
    { path: 'list', component: ListImagesComponent },
    { path: 'upload', component: UploadImageComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}