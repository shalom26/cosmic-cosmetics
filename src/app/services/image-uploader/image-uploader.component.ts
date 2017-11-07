import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ImageUploaderService} from "./image-uploader.service";

declare var cloudinary: any;
declare var $: any;

export interface IImage {
  image: {
    url: string
    secure_url: string
  }
}

@Component({
  selector: 'cc-image-uploader',
  template: `
    <div class="upload-container" (click)="openWidget()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  // Inputs
  @Input() folder: string;
  @Input() isProfilePic = null;

  @Input()
  set uploadMode(value) {
    this._uploadMode = value;
  };

  // Input receive image of type Cloudinary image.
  // Docs can be found here: http://cloudinary.com/documentation/upload_images#upload_notifications
  @Input()
  set cancelImageUpload(image) {
    if (image.delete_token) {
      this.cancelImage(image)
    }
  }

  // Outputs
  @Output() uploadedImage: EventEmitter<any> = new EventEmitter();
  @Output() uploadedEditImage: EventEmitter<any> = new EventEmitter();
  @Output() afterCancelEvent: EventEmitter<any> = new EventEmitter();

  // Class variables
  private _uploadMode: string;

  constructor(private imageUploaderService: ImageUploaderService) {
  }

  ngOnInit() {
  }

  cancelImage(image) {
    this.imageUploaderService.deleteImage(image);
  }


  openWidget() {
    cloudinary.openUploadWidget({
        cloud_name: 'cosmic-cosmetics',
        upload_preset: 'regular',
        resource_type: 'image',
        // keep_widget_open: true,
        theme: 'minimal',
        client_allowed_formats: ["gif", "tif", "bmp", "jpg", "jpeg", "png"],
        show_powered_by: false,
        cropping_coordinates_mode: 'custom',
        cropping: 'server',
        cropping_aspect_ratio: this.isProfilePic,
        sources: ['local', 'url'],
        stylesheet: `
       #cloudinary-overlay { background-color: #a7a7a7; }
       #cloudinary-widget {
               background: #f0f0f0;
                width: 50% !important;
                max-width:660px;
               left: 5vw !important; 
               margin-left: 17.5vw;
               top: 50%;
               } 
       #cloudinary-widget .panel {height:auto;}
       #cloudinary-overlay.modal {background-color:rgba(0,0,0,0.7); }
       #cloudinary-widget .drag_area {
               background: #fff;
               /* border: 2px dashed #ddd; */
               /* -webkit-border-radius: 4px; */
               -moz-border-radius: 4px;
                border-radius: 4px;
                margin: 0px 0px 0px 0px;}
               
       .widget .panel.camera .video_holder{
                height:100px
                                }
       .widget .panel.url .note {padding:20px 20px;}
       .widget .panel.url .button_holder{padding-bottom:20px}
`
      },
      (error, res) => {
        if (res) {
          if (this._uploadMode === 'edit')
            this.uploadedEditImage.emit({image: res[0]});
          else
            this.uploadedImage.emit({image: res[0]});
        }
      });
  }

}
