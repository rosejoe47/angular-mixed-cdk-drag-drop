import { Component } from '@angular/core';
import { CdkDragDrop, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  handler = false;
  orientation: DropListOrientation = 'horizontal';
  percentWidth = 0;
  percentHeight = 0;
  ids = [1,2,3,4,5,6,7,8,9];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
  }

  dropped(event: { previousIndex: number, currentIndex: number }) {
    moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
  }

  onAdd() {
    this.ids.push(this.ids.length + 1);
  }
}
