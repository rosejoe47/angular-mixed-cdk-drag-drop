import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MixedCdkDragDropModule } from '@lib/mixed-cdk-drag-drop.module';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-module-page',
  templateUrl: './../base/base.component.html',
  styleUrls: ['./../base/base.component.scss'],
  standalone: true,
  imports:[MixedCdkDragDropModule, DragDropModule]
})
export class ModulePageComponent extends BaseComponent {
} 