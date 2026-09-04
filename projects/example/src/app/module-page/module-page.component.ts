import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-module-page',
  standalone: false,
  templateUrl: './../base/base.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./../base/base.component.scss'],
})
export class ModulePageComponent extends BaseComponent {
  override exampleTitle = 'Module Example (compatibility)';
}
