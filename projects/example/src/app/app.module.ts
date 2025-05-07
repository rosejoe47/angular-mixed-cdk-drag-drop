import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MixedCdkDragDropModule } from '../../../angular-mixed-cdk-drag-drop/src/lib/mixed-cdk-drag-drop.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: 'standalone', loadComponent: () => import('./standalone-page/standalone-page.component').then(m => m.StandalonePageComponent) },
      { path: 'module', loadComponent: () => import('./module-page/module-page.component').then(m => m.ModulePageComponent) }
    ]),
    DragDropModule,
    MatCardModule,
    ScrollingModule,
    MixedCdkDragDropModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
