/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AuthenticationEffects } from "src/app/auth/store/auth.effects";
import { ProductEffects } from "src/app/product/store/product.effects";
import { ShoppingCartEffects } from "src/app/shopping-cart/store/shopping-cart.effects";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core.module";
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";

import * as fromApp from "./app.reducer";

//=============================================================================

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    ShoppingCartModule, // Pipe can't seem to be found if this module is not imported 🤷
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthenticationEffects,
      ProductEffects,
      ShoppingCartEffects,
    ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [CustomPreloadingStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {}

//=============================================================================
