import {Component, OnInit} from '@angular/core';
import {DataService} from "../server/data-service.service";
import {CalendarEvent} from 'angular-calendar';


interface IEmployee {
  full_name: string
  id: { $oid: string }
  picture_url: string
  services_ids: string[]
  shifts: CalendarEvent[]
  url: string
  isEdit?: boolean
  selected?: boolean
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public emps: IEmployee[] = [];
  public view: string = 'week';
  public viewDate: Date = new Date();
  public events: CalendarEvent [] = [];
  public selectedEmp: IEmployee;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getEmployees().subscribe(emps => {
      console.log(emps);
      this.emps = emps;
      this.emps[0].selected = true;
      this.selectedEmp = this.emps[0];
    })
  }

  addEmployee() {
    this.dataService.addEmployee().subscribe(emp => {
      emp.isEdit = true;
      this.emps.push(emp);
      console.log('newEmp', emp);
    })
  }

  setEditMode(emp) {
    emp.isEdit = !emp.isEdit;
  }

  saveEdit(emp) {
    console.log(emp);
    this.dataService.saveEmployee(emp).subscribe(savedEmp => {
      console.log('saved emp -->', savedEmp);
      emp.isEdit = false;
    })
  }

  deleteEmployee(emp) {
    this.dataService.deleteEmployee(emp).subscribe(res => {
        this.emps = this.emps.filter(employee => employee !== emp);
      }
    )
  }

  selectEmployee(emp, index) {
    this.selectedEmp.selected = false;
    emp.selected = true;
    emp.shifts.forEach((shift) => {
      shift.start = new Date(shift.start);
      shift.end = new Date(shift.end);
    })
    this.events = emp.shifts;
    this.selectedEmp = emp;
  }

}
