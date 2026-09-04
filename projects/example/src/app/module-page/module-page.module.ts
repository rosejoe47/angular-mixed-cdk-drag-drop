import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MixedCdkDragDropModule } from '@lib/mixed-cdk-drag-drop.module';
import { ModulePageComponent } from './module-page.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    MixedCdkDragDropModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModulePageComponent,
      },
    ]),
  ],
  declarations: [ModulePageComponent],
})
export class ModulePageModule {}

