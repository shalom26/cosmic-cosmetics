import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {URLS} from "../shared/app-consts";
import {AuthHttp} from "angular2-jwt";

export interface IBrand {
  _id: {
    $oid: string
  },
  about: string
  account_id: string
  address: string
  cover_url: string
  design: {
    _id: {
      $oid: string
    },
    base_color: string
    cta_text: string
    primary_color: string
    prime_service_id: string
    secondary_color: string
  },
  facebook_url: string
  instagram_url: string
  logo_url: string
  phone_number: string
  title: string
  id: string
}

@Injectable()
export class DataService {
  static isLoggedIn: boolean = false;
  static brands: IBrand[];
  selectedBrand: IBrand;

  constructor(private http: Http, public authHttp: AuthHttp) {
  }

  login(val) {
    let url = URLS.baseApi + 'users/sign_in';
    return this.http.post(url, val)
      .map(res => res.json())
  }

  getIcons(){
    let url = URLS.baseApi + 'service_icon_list';
    return this.authHttp.get(url).map((res)=>res.json())
  }
  //Employees
  getEmployees() {
    let url = URLS.baseApi + 'employees';
    return this.authHttp.get(url).map((res) => res.json())
  }

  addEmployee(){
    let url = URLS.baseApi + 'employees';
    let service = {brand_id:this.selectedBrand.id};
    return this.authHttp.post(url,service).map((res) => res.json())
  }

  saveEmployee(emp){
    let url = URLS.baseApi + 'employees' + '/' + emp.id.$oid;
    return this.authHttp.put(url, emp).map((res) => res.json())
  }

  deleteEmployee(emp){
    let url = URLS.baseApi + 'employees' + '/' + emp.id.$oid;
    return this.authHttp.delete(url).map((res) => res.json())
  }

  getClients() {
    let url = URLS.baseApi + 'clients';
    return this.authHttp.get(url).map((res) => res.json())
  }

  addClient() {
    let url = URLS.baseApi + 'clients';
    let service = {brand_id:this.selectedBrand.id};
    return this.authHttp.post(url, service).map((res) => res.json())
  }

  updateClient(client) {
    let url = URLS.baseApi + 'clients' + '/' + client.id.$oid;
    return this.authHttp.put(url, client).map((res) => res.json())
  }



  getBrands() {
    let url = URLS.baseApi + 'brands';
    return this.authHttp.get(url).map((res) => res.json())
  }

  getSelectedBrand() {
    return this.selectedBrand;
  }

  setSelectedBrand(brand) {
    this.selectedBrand = brand;
  }

  updateBrand(brand) {
    let url = URLS.baseApi + 'brands' + '/' + this.selectedBrand.id;
    return this.authHttp.put(url, brand).map((res) => res.json())
  }

  updateBrandDesign(design) {
    let url = URLS.baseApi + 'designs' + '/' + this.selectedBrand.id;
    return this.authHttp.put(url, design).map((res) => res.json())
  }

  getServices() {
    let url = URLS.baseApi + 'services';
    return this.authHttp.get(url).map((res) => res.json())
  }

  updateService(service) {
    let url = URLS.baseApi + 'services' + '/' + service.id.$oid;
    return this.authHttp.put(url, service).map((res) => res.json())
  }

  addService() {
    let url = URLS.baseApi + 'services';
    let service = {brand_id:this.selectedBrand.id};
    return this.authHttp.post(url, service).map((res) => res.json())
  }

}
