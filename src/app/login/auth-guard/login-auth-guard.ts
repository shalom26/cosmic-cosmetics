import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {SharedService} from "../../shared/services/shared.service";
import {DataService} from "../../server/data-service.service";

@Injectable()
export class LoginAuthGuard implements CanActivate {

  constructor(private router: Router,
              private sharedService: SharedService,
              private dataService: DataService) {
  }

  canActivate() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login').then(() => {
        this.sharedService.isNavBar.next(false);
      });
      return false
    }
    this.sharedService.isNavBar.next(true);
    //Get Brands
    if (!this.sharedService.isdataInit) {
      return this.dataService.getBrands().map((res) => {
        //Set default brand
        this.dataService.setSelectedBrand(res[0]);
        this.sharedService.isdataInit = true;
        return true
      })
    } else {
      return true
    }
  }
}
