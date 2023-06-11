/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/models/user.model";
import * as fromApp from "../../app.reducer";

//=============================================================================

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private store: Store<fromApp.AppState>) {}

  getApplicationUser(): Observable<User> {
    return this.store.select("authentication").pipe(
      map((authenticationState) => {
        return authenticationState.user;
      })
    );
  }

  userIsConsumer(user: User): boolean {
    return user !== null ? !user.isAdmin : true;
  }

  userIsAdmin(user: User): boolean {
    return user !== null ? user.isAdmin : false;
  }
}

//=============================================================================
