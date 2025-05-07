import { CdkDragDrop, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';

import { MixedCdkDragSizeHelperDirective, MixedCdkDragContainerSize } from '@lib/mixed-cdk-drag-drop.directive';

export class BaseComponent {
  readonly horizontal: DropListOrientation = 'horizontal';
  readonly vertical: DropListOrientation = 'vertical';

  handler = false;
  orientation: DropListOrientation = 'horizontal';
  percentWidth = 25;
  percentHeight = 0;
  resizeCheck = false;
  resizeW = 300;
  ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
  }

  dropped(event: { previousIndex: number; currentIndex: number }) {
    moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
  }

  onSizeChange(event: MixedCdkDragContainerSize) {
    MixedCdkDragSizeHelperDirective.defaultEmitter(event, Number(this.percentWidth), Number(this.percentHeight));
  }

  onAdd() {
    this.ids.push(this.ids.length + 1);
  }
}
