import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {SharedService} from "../../shared/services/shared.service";

@Injectable()
export class LoginAuthGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedService) {
  }

  canActivate() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login').then(() => {
        this.sharedService.isNavBar.next(false);
      });
      return false
    }
    this.sharedService.isNavBar.next(true);
    return true;
  }
}
