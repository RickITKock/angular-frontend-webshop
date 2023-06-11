/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthenticationComponent } from "./auth.component";
import * as ROUTES from "./auth.routes";

//=============================================================================

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: ROUTES.DEFAULT_PATH, redirectTo: ROUTES.LOGIN_PATH },
      { path: ROUTES.LOGIN_PATH, component: AuthenticationComponent },
      { path: ROUTES.SIGNUP_PATH, component: AuthenticationComponent },
    ]),
    SharedModule,
  ],
  declarations: [AuthenticationComponent],
})
export class AuthenticationModule {}

//=============================================================================
