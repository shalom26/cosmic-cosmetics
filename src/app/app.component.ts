import {Component, OnInit} from '@angular/core';
import {DataService} from "./server/data-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = DataService.isLoggedIn;
  public isData: boolean = false;
  public navLinks = [
    {
      link: 'calendar',
      label: 'יומן'
    }, {
      link: 'clients',
      label: 'לקוחות'
    }, {
      link: 'employees',
      label: 'עובדים'
    }, {
      link: 'services',
      label: 'שרותים'
    },
    {
      link: 'settings',
      label: 'הגדרות'
    }
  ];


  constructor(private dataService: DataService,private router:ActivatedRoute) {
  }
  //Todo cancel nav bar on login page
  ngOnInit() {
    this.router.url.subscribe(route=>{
      console.log(route);
    });
    //Get Brands
    this.dataService.getBrands().subscribe((res) => {
      //Set default brand
      this.dataService.setSelectedBrand(res[0]);
      this.isData = true;

    })
  }


}
