/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from 'src/app/auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { ProductEffects } from 'src/app/product/store/product.effects';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartEffects } from 'src/app/shopping-cart/store/shopping-cart.effects';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { CustomPreloadingStrategy} from './custom-preloading-strategy';

import * as fromApp from './app.reducer';

//=============================================================================

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ShoppingCartModule, // Pipe can't seem to be found if this module is not imported 🤷
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthenticationEffects, ProductEffects, ShoppingCartEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ CustomPreloadingStrategy ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

//=============================================================================
