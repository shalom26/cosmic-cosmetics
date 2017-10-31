import {Component, OnInit} from '@angular/core';
import {DataService} from "../server/data-service.service";
import {URLS} from "../shared/app-consts";

export interface IService {
  album: string
  brand_id: string
  duration_in_minutes: number
  icon_name: string
  id: { $oid: string }
  price: number
  service_name: string
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public rows: IService[];
  public editing = [];
  public icons = [];
  public url = URLS.baseApi + URLS.icons;


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getIcons().subscribe(iconsList => {
      console.log(iconsList);
      this.icons = iconsList;
    });

    this.dataService.getServices().subscribe((res) => {
      console.log('services', res);
      this.rows = res;
    })

  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.dataService.updateService(this.rows[rowIndex]).subscribe();
  }

  addService() {
    this.dataService.addService().subscribe(res => {
      this.rows.push(res);
    });
  }

  selectIcon(icon, cell, rowIndex) {
    let event = {target: {value:icon}};
    this.updateValue(event, cell, rowIndex);
  }

}
