import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdTabsModule} from "@angular/material";
import {MyCalendarComponent} from './calendar/calendar.component';
import {ServicesComponent} from './services/services.component';
import {EmployeesComponent} from './employees/employees.component';
import {NgbDatepickerModule, NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import {appRoutes} from "./app.routes";
import {CalendarHeaderComponent} from "./calendar/calender-header";
import {DateTimePickerComponent} from "./calendar/calendar-time-picker";
import {CalendarDateFormatter, CalendarModule, CalendarUtils} from "angular-calendar";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from "./server/data-service.service";
import {HttpModule} from "@angular/http";
import {LoginComponent} from './login/login.component';
import {AuthModule} from "./server/auth.module";
import {ClientsComponent} from "./clients/clients.component";
import { SettingsComponent } from './settings/settings.component';
import {Ng2DropdownModule} from "ng2-material-dropdown";
import {IsLoggedIn, LoginAuthGuard} from "./login/auth-guard/login-auth-guard";
import {SharedService} from "./shared/services/shared.service";
import {BsDatepickerModule} from "ngx-bootstrap";





@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    EmployeesComponent,
    MyCalendarComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent,
    ClientsComponent,
    LoginComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    appRoutes,
    BrowserAnimationsModule,
    MdTabsModule,
    MdButtonModule,
    MdCheckboxModule,
    AuthModule,
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxDatatableModule,
    Ng2DropdownModule

],
  providers: [
    CalendarDateFormatter,
    CalendarUtils,
    DataService,
    LoginAuthGuard,
    SharedService,
    IsLoggedIn
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
