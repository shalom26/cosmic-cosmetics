import {Component, OnInit} from '@angular/core';
import {DataService, IBrand} from "../server/data-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IService} from "../services/services.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selectedBrand: IBrand;
  formGroup: FormGroup;
  designFormGroup: FormGroup;
  public services = [];
  public displayServiceName:IService = {album: '',
    brand_id: '',
    duration_in_minutes: 0,
    icon_name: '',
    id: { $oid: '' },
    price: 0,
    service_name:'בחר שרות מהיר'};


  constructor(private dataService: DataService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.selectedBrand = this.dataService.getSelectedBrand();

    this.dataService.getServices().subscribe((res) => {
      this.services = [...res];
      this.displayServiceName = res.filter(service => {
        return service.id.$oid === this.selectedBrand.design.prime_service_id;
      })[0];
    });

    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      title: [],
      about: [],
      address: [],
      phone: [],
      facebookUrl: [],
      instergramUrl: [],
      logoUrl: [],
      coverUrl: []
    });

    this.designFormGroup = this.fb.group({
      primary: [],
      secondary: [],
      baseColor: [],
      btnText: [],
      primeService: []
    });

  }

  onBrandFormSubmit() {
    this.dataService.updateBrand(this.selectedBrand).subscribe();
  }

  onDesignFormSubmit() {
    this.dataService.updateBrandDesign(this.selectedBrand.design).subscribe();
  }

  selectService(service) {
    this.selectedBrand.design.prime_service_id = service.id.$oid;
    this.displayServiceName = service;
  }
}
