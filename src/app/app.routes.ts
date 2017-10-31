import {RouterModule, Routes} from "@angular/router";
import {MyCalendarComponent} from "./calendar/calendar.component";
import {EmployeesComponent} from "./employees/employees.component";
import {ServicesComponent} from "./services/services.component";
import {LoginComponent} from "./login/login.component";
import {ClientsComponent} from "./clients/clients.component";
import {SettingsComponent} from "./settings/settings.component";

//Todo canActivate + get data

export const routes: Routes = [
  {path: '', redirectTo: 'calendar', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "calendar", component: MyCalendarComponent},
  {path: "employees", component: EmployeesComponent},
  {path: "clients", component: ClientsComponent},
  {path: "services", component: ServicesComponent},
  {path: "settings", component: SettingsComponent},
  {path: '**', redirectTo: 'calendar'}
];

export const appRoutes = RouterModule.forRoot(routes);
