import { ModuleWithProviders, NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MixedCdkDragSizeHelperDirective,
  MixedCdkDragDropDirective,
  MixedCdkDropListDirective,
} from './mixed-cdk-drag-drop.directive';
import { MixedDragDropConfig } from './mixed-drag-drop';

@NgModule({
  imports: [
    DragDropModule,
    MixedCdkDragDropDirective,
    MixedCdkDropListDirective,
    MixedCdkDragSizeHelperDirective
  ],
  exports: [
    MixedCdkDragDropDirective,
    MixedCdkDropListDirective,
    MixedCdkDragSizeHelperDirective
  ],
  providers: [
    {
      provide: MixedDragDropConfig,
      useValue: MixedDragDropConfig,
    },
  ],
})
export class MixedCdkDragDropModule {
  static forRoot(config: MixedDragDropConfig): ModuleWithProviders<MixedCdkDragDropModule> {
    return {
      ngModule: MixedCdkDragDropModule,
      providers: [
        {
          provide: MixedDragDropConfig,
          useValue: config,
        },
      ],
    };
  }
}
