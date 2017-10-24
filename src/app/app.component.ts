import {Component, OnInit} from '@angular/core';
import {DataService} from "./server/data-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = DataService.isLoggedIn;
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


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    //Get Brands
    this.dataService.getBrands().subscribe((res) => {
      //Set default brand
      this.dataService.setSelectedBrand(res[0]);
    })
  }


}
