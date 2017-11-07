import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedService {

  isNavBar: Subject<boolean> = new Subject();
  isNavBar$ = this.isNavBar.asObservable();

  isdataInit: boolean = false;

}
