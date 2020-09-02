import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../../app-services/security.service';
import { FormHelperService } from '../../app-services/form-helper.service';
import { Identity } from '../../app-models/identity';

@Component({
  selector: 'app-security-login',
  templateUrl: './security-login.component.html',
  styleUrls: ['./security-login.component.scss']
})
export class SecurityLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private securityService: SecurityService,
    private formHelperService: FormHelperService) {}

  securityLoginForm: FormGroup;
  loginModel: any;

  ngOnInit() {
    this.loginModel = {
      email: '',
      password: ''
    };
    this.securityLoginForm = this.fb.group({
      email: new FormControl(this.loginModel.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.loginModel.password, [
        Validators.required
      ])
    });
  }

  sendSecurityLoginForm(event: Event): void {
    event.preventDefault();
    this.formHelperService.validateAllFormFields(this.securityLoginForm);

    if (this.securityLoginForm.valid) {
      this.securityService.requestIdentity(this.securityLoginForm.value)
      .subscribe(
        (res: Identity) => {
          this.securityService.login(res);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => {
          console.log(err);
          this.formHelperService.showError('Errors.GenericError', null);
        }
      );
    }
  }
}
