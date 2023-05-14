/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { IUserCredentials } from './interfaces/IUserCredentials.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';
import * as fromAuth from './store/auth.reducer';
import * as AuthenticationActions from './store/auth.actions';
import * as AUTH_ROUTES from '../auth/auth.routes';

const LOGIN: string = 'LOGIN';
const SIGNUP: string = 'SIGNUP';

//=============================================================================

@Component ({
    selector: 'app-authentication',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthenticationComponent {
  authState: Observable<fromAuth.State>;
  authenticationMode: string = LOGIN;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromApp.AppState>) {}

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  ngOnInit() {
    const path: string = this.route.routeConfig.path;
    this.authenticationMode = (path === "signup") ? SIGNUP : LOGIN;
    this.authState = this.store.select('authentication');

    this.authForm = new FormGroup({
      'userData' : new FormGroup({
        'email' : new FormControl(null, [Validators.required, Validators.required ], this.forbiddenEmails),
        'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
  }

  onSwitchMode() {
      if (this.authenticationMode === LOGIN) {
        this.authenticationMode = SIGNUP;
        this.location.go(AUTH_ROUTES.ABSOLUTE_PATH_SIGNUP);
      } else {
        this.authenticationMode = LOGIN;
        this.location.go(AUTH_ROUTES.ABSOLUTE_PATH_LOGIN);
      }
      this.store.dispatch(new AuthenticationActions.ClearError());
      this.store.dispatch(new AuthenticationActions.ClearSuccessStatus());
      this.authForm.reset();
  }

  onSubmit() {
    if (!this.authForm.valid) { return; }

    const userCredentials: IUserCredentials = {
      email: this.authForm.get('userData').value.email,
      password: this.authForm.get('userData').value.password
    };

    this.loginOrSubmitForm(this.authenticationMode, userCredentials);
    this.authForm.reset();
  }

  //=============================================================================

  private loginOrSubmitForm(mode: string, userCredentials: IUserCredentials) {
    if (mode === LOGIN) {
      this.submitLoginForm(userCredentials);
    } else {
      this.submitSignUpForm(userCredentials);
      this.onSwitchMode();
    }
  }

  private submitLoginForm(userCredentials: IUserCredentials) {
    this.store.dispatch(new AuthenticationActions.ClearSuccessStatus());
    this.store.dispatch(
      new AuthenticationActions.LoginStart({
        email: userCredentials.email,
        password: userCredentials.password
      })
    )
  }

  private submitSignUpForm(userCredentials: IUserCredentials) {
    this.store.dispatch(
      new AuthenticationActions.SignupStart({
        email: userCredentials.email,
        password: userCredentials.password
      })
    )
  }
}

//=============================================================================
