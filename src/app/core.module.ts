/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoggingInterceptor } from './miscellaneous/logging.interceptor';

import { ProductService } from 'src/app/product/services/product.service';
import { AuthInterceptorService } from './services/AuthInterceptorService.service';
// import { AuthenticationInterceptorService } from 'src/services/auth-interceptor.service';

@NgModule({
  providers: [
    ProductService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}

//=============================================================================
