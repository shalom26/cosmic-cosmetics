import {RouterModule, Routes} from "@angular/router";
import {MyCalendarComponent} from "./calendar/calendar.component";
import {EmployeesComponent} from "./employees/employees.component";
import {ServicesComponent} from "./services/services.component";
import {LoginComponent} from "./login/login.component";
import {ClientsComponent} from "./clients/clients.component";
import {SettingsComponent} from "./settings/settings.component";
import {IsLoggedIn, LoginAuthGuard} from "./login/auth-guard/login-auth-guard";


export const routes: Routes = [
  {path: '', redirectTo: 'calendar', pathMatch: 'full'},
  {path: "login", component: LoginComponent,canActivate:[IsLoggedIn]},
  {path: "calendar", component: MyCalendarComponent, canActivate: [LoginAuthGuard]},
  {path: "employees", component: EmployeesComponent, canActivate: [LoginAuthGuard]},
  {path: "clients", component: ClientsComponent, canActivate: [LoginAuthGuard]},
  {path: "services", component: ServicesComponent, canActivate: [LoginAuthGuard]},
  {path: "settings", component: SettingsComponent, canActivate: [LoginAuthGuard]},
  {path: '**', redirectTo: 'calendar',canActivate:[LoginAuthGuard]}
];

export const appRoutes = RouterModule.forRoot(routes);
