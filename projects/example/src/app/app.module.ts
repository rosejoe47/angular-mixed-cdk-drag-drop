import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';

import { MixedCdkDragDropModule } from '../../../angular-mixed-cdk-drag-drop/src/lib/mixed-cdk-drag-drop.module';

@NgModule({
  imports: [BrowserModule, MatCardModule, DragDropModule, ScrollingModule, MixedCdkDragDropModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
