import { User } from 'src/models/user.model';
import * as AuthenticationActions from './auth.actions';

export interface State {
  user: User;
  errorStatus: string;
  successStatus: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  errorStatus: null,
  successStatus: null,
  loading: false
}

export function authenticationReducer(
  state = initialState,
  action: AuthenticationActions.AuthenticationActions
) {
  switch (action.type) {
    case AuthenticationActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.userId,
        action.payload.email,
        action.payload.isAdmin
      );

      return {
        ...state,
        user: user,
        errorStatus: null,
        loading: false
      };

    case AuthenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case AuthenticationActions.LOGIN_START:
    case AuthenticationActions.SIGNUP_START:
      return {
        ...state,
        errorStatus: null,
        loading: true
      };

    case AuthenticationActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        errorStatus: action.payload,
        loading: false
      };

    case AuthenticationActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        successStatus: "Thanks! Your account has been successfully created.",
        loading: false,
        errorStatus: null
      };

    case AuthenticationActions.CLEAR_ERROR:
      return {
        ...state,
        errorStatus: null
      };

    case AuthenticationActions.CLEAR_SUCCESS_STATUS:
      return {
        ...state,
        successStatus: null
      };

    default:
      return state;
  }
}
