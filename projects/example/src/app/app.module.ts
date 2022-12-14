import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MixedCdkDragDropModule } from '../../../angular-mixed-cdk-drag-drop/src/lib/mixed-cdk-drag-drop.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatCardModule, DragDropModule, MixedCdkDragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
