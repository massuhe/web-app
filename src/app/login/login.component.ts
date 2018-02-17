import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidacionService } from '../core/validacion.service';
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggin: boolean;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      usuario: ['', {updateOn: 'blur', validators: [Validators.required]}],
      contrasena: ['', {updateOn: 'change', validators: [Validators.required]}],
    });
  }

  login(e) {
    if (this.loginForm.valid) {
      this.isLoggin = true;
      this.authenticationService.login(e.usuario, e.contrasena)
        .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
    } else {
      Object.keys(this.loginForm.controls).forEach(ck => this.loginForm.get(ck).markAsDirty());
    }
  }

  onSuccess() {
    // this.isLoggin = false;
    this.router.navigate(['/home']);
  }

  onError(err) {
    this.isLoggin = false;
  }

}
