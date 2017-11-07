
import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

// image-uploader components
import {ImageUploaderComponent} from "./image-uploader.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ImageUploaderComponent,
  ],
  exports: [
    ImageUploaderComponent,
  ]
})

export class ImageUploaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageUploaderModule,
      providers: [
      ]
    }
  }
}
