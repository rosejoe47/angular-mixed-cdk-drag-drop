import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDropList,
  CdkDropListGroup,
  CdkDrag,
} from '@angular/cdk/drag-drop';

import { 
  MixedCdkDragDropDirective,
  MixedCdkDropListDirective,
  MixedCdkDragSizeHelperDirective 
} from '@lib/mixed-cdk-drag-drop.directive';
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
    MixedCdkDragDropDirective,
    MixedCdkDropListDirective,
    MixedCdkDragSizeHelperDirective
  ]
})
export class StandalonePageComponent extends BaseComponent {
} 