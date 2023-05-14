/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//=============================================================================

@Injectable({
  providedIn: 'root'
})
export class LoggingIntercepterService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing request: ');
    console.log(request.url);
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response');
          console.log(event.body);
        }
      })
    );
  }
}

//=============================================================================
