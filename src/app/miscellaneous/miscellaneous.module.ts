/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  imports: [CommonModule, PageNotFoundComponent],
  declarations: [PageNotFoundComponent],
})
export class MiscellaneousModule {}

//=============================================================================
