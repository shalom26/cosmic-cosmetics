import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {URLS} from "../shared/app-consts";

@Injectable()
export class DataService {
  static isLoggedIn: boolean = false;

  constructor(private http: Http) {
  }

  login(val) {
    let url = URLS.baseApi + 'users/sign_in';
    return this.http.post(url, val)
      .map(res => res.json())
  }

  getEmployees() {
    let url = URLS.baseApi + 'employees';
    return this.http.get(url).map((res) => res.json())
  }

}
