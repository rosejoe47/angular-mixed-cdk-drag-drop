import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MixedCdkDragDropModule } from '../../../angular-cdk-mixed-drag-drop/src/lib/mixed-cdk-drag-drop.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    DragDropModule,
    MixedCdkDragDropModule.forRoot({ autoScrollStep: 4 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
