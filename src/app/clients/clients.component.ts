import {Component, OnInit} from '@angular/core';
import {DataService} from "../server/data-service.service";

interface IClinet {
  birthday: string
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
  public rows:IClinet[];
  editing = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getClinets().subscribe((clients) => {
      console.log('clients', clients);
      this.rows = clients;
    }, (err) => {
      console.log(err);
    })

  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.dataService.updateClient(this.rows[rowIndex]).subscribe();
  }

  addClient() {
    this.dataService.addClient().subscribe(res => {
      this.rows.push(res);
    });
  }

}
