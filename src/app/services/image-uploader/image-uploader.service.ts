import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";

declare var cloudinary: any;
declare var $: any;

@Injectable()
export class ImageUploaderService {
  constructor() {
  }

  // https://api.cloudinary.com/v1_1/casific/delete_by_token

  deleteImage(image) {
    //Todo config once in root component
    $.cloudinary.config({cloud_name: 'cosmic-cosmetics', secure: true});
    $.cloudinary.delete_by_token(image.delete_token);
  }
}
