import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../server/data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router:Router) {
  }

  ngOnInit() {
    DataService.isLoggedIn = false;
    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
    this.formGroup.markAsTouched();

  }

  login(val) {
    this.dataService.login(val).subscribe((res) => {
      localStorage.setItem('token', res.auth_token);
      DataService.isLoggedIn = true;
      this.router.navigateByUrl('');
    })
  }

}
