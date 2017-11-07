import {Component, OnInit} from '@angular/core';
import {DataService, IBrand} from "../server/data-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  public displayServiceName;


  constructor(private dataService: DataService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.selectedBrand = this.dataService.getSelectedBrand();



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
    })

    this.dataService.getServices().subscribe(servicesList => {
      console.log(servicesList);

      this.services = servicesList;

      this.displayServiceName = this.services.filter(service=>{
        return service.id = this.selectedBrand.design.prime_service_id;
      })[0]
    });



    this.designFormGroup
  }

  onBrandFormSubmit() {
    this.dataService.updateBrand(this.selectedBrand).subscribe();
  }

  onDesignFormSubmit() {
    this.dataService.updateBrandDesign(this.selectedBrand.design).subscribe();
  }

  selectService(service, cell, rowIndex) {
    let event = {target: {value:service}};
    // this.selectedBrand.design.prime_service_id = service.id.$oid;
    console.log(service);

    this.displayServiceName = this.services.filter(service=>{
      return service.id = this.selectedBrand.design.prime_service_id;
    })[0]
  }


}
