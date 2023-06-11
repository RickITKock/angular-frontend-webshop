/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/models/user.model";
import * as fromApp from "./app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})

//=============================================================================
export class AppComponent {
  user: User = null;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}

//=============================================================================
