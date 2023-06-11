/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromApp from "../../app/app.reducer";

//=============================================================================

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("authentication").pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request;

        // if you need to use a token for every request or something,
        // modify the request here
        return next.handle(modifiedRequest);
      })
    );
  }
}

//=============================================================================
