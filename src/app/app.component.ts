/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
