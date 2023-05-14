/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.actions';
import * as fromApp from '../../app.reducer';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchShoppingCart } from 'src/app/shopping-cart/store/shopping-cart.actions';
import { Store } from '@ngrx/store';

//=============================================================================

const USERS_URL:string = 'http://localhost:8080/users';

export interface AuthenticationResponseData {
  id: string;
  email: string;
  admin: boolean;
}

const handleAuthentication = (
  userId: string,
  email: string,
  isAdmin: boolean,
  redirect: boolean
) => {
  const user = new User(userId, email, isAdmin);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    userId: userId,
    email: email,
    isAdmin: isAdmin,
    redirect: redirect
  });
};

const handleError = (errorResponse: any) => {
  let unknownErrorMessage: string = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(unknownErrorMessage));
  }
  return of(new AuthActions.AuthenticateFail(errorResponse.error));
}

@Injectable()
export class AuthenticationEffects {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authenticationSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      const userCredentials = `${signupAction.payload.email}/${signupAction.payload.password}`;
      return this.http
        .post<AuthenticationResponseData>(
          `${USERS_URL}/signup/${userCredentials}`,
          null
        )
        .pipe(
          map(() => {
            return new AuthActions.SignUpSuccess();
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  authenticationLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authenticationData: AuthActions.LoginStart) => {
      const userCredentials = `${authenticationData.payload.email}/${authenticationData.payload.password}`;
      return this.http
        .post<AuthenticationResponseData>(
          `${USERS_URL}/login/${userCredentials}`,
          null
        )
        .pipe(
          map(responseData => {
            console.log(responseData.id);
            if(!responseData.admin) {
              this.store.dispatch(new FetchShoppingCart(+responseData.id));
            }
            return handleAuthentication(
              responseData.id,
              responseData.email,
              responseData.admin,
              true
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect({ dispatch: false })
  authenticationRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) { this.router.navigate(['/']); }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        userId: string;
        email: string;
        isAdmin: boolean
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.userId,
        userData.email,
        userData.isAdmin
      );
      if(!loadedUser.isAdmin) {
        this.store.dispatch(new FetchShoppingCart(+loadedUser.userId));
      }
      return new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: loadedUser.userId,
        isAdmin: loadedUser.isAdmin,
        redirect: false
      })
    })
  )

  @Effect({ dispatch: false })
  authenticationLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['']);
    })
  )
}

//=============================================================================
