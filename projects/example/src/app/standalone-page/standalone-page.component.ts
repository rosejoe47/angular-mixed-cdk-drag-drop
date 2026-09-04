import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDropList,
  CdkDropListGroup,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
  MixedCdkDragDropDirective,
  MixedCdkDropListDirective,
  MixedCdkDragSizeHelperDirective,
} from '@lib/mixed-cdk-drag-drop.directive';
import { provideMixedCdkDragDrop } from '@lib/mixed-drag-drop';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-standalone-page',
  templateUrl: './../base/base.component.html',
  styleUrls: ['./../base/base.component.scss'],
  standalone: true,
  imports: [
    DragDropModule,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    ScrollingModule,
    MixedCdkDragDropDirective,
    MixedCdkDropListDirective,
    MixedCdkDragSizeHelperDirective,
  ],
  providers: [provideMixedCdkDragDrop()],
})
export class StandalonePageComponent extends BaseComponent {
  override exampleTitle = 'Standalone Example (recommended)';
}
