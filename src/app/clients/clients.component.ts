import {Component, OnInit} from '@angular/core';
import {DataService} from "../server/data-service.service";
import {BsDatepickerConfig} from "ngx-bootstrap";

interface IClinet {
  birthday: any
  brand_id: string
  email: string
  full_name: string
  id: { $oid: string }
  phone_number: string
  url: string
}

@Component({
  selector: 'app-customers',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public rows: IClinet[];
  editing = [];
  public bsConfig: Partial<BsDatepickerConfig>;


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getClients().subscribe((clients) => {
      clients.forEach(row => {
        if (!(row.birthday instanceof Date)) {
          row.birthday = new Date(row.birthday);
        }
        this.rows = clients;
      });
      console.log('clients', clients);
    }, (err) => {
      console.log(err);
    });

    this.bsConfig = {containerClass: 'theme-blue'}

  }

  updateValue(event, cell, rowIndex) {
    if (this.rows.length > 0) {
      if (event && cell === 'birthday') {
        console.log('type of --->>', typeof event);
        if (!typeof(event) === null) {
          event = new Date(event);
          console.log('Parse date ', event);
        }
        let obj = {target: {value: event}};
        event = Object.assign({}, obj);
      }
      if (event.target) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        this.dataService.updateClient(this.rows[rowIndex]).subscribe();
      }
    }
  }

  addClient() {
    this.dataService.addClient().subscribe(res => {
      this.rows.push(res);
    });
  }

}
