import {Component, OnInit} from '@angular/core';
import {DataService} from "./server/data-service.service";
import {SharedService} from "./shared/services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isData: boolean = false;
  public isNavBar: boolean = false;
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
      label: 'טיפולים'
    },
    {
      link: 'settings',
      label: 'הגדרות'
    }
  ];


  constructor(private dataService: DataService,
              private sharedService: SharedService) {}

  ngOnInit() {
    //set SideBar state
    this.sharedService.isNavBar$.subscribe(state => {
      this.isNavBar = state;
    });

  }


}
