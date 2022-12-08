import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Self,
  SimpleChanges,
  SkipSelf
} from '@angular/core';
import {
  CdkDropList,
  CdkDragEnter,
  moveItemInArray,
  CdkDragSortEvent,
  DropListOrientation,
  CdkDropListGroup,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { MixedDragDropConfig } from './mixed-drag-drop';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cdkDropListGroup][mixedCdkDragDrop]',
})
export class MixedCdkDragDropDirective<T = any> implements OnChanges {
  /** @param {EventEmitter} dropped: emit previousIndex and currentIndex when dropList dropped. Valid when itemList is not being provided. **/
  @Output() readonly dropped: EventEmitter<{previousIndex: number, currentIndex: number}> = new EventEmitter<{previousIndex: number, currentIndex: number}>();

  @Input() itemList: T[] | undefined;
  @Input() orientation: DropListOrientation = 'horizontal';

  private targetIndex = -1;
  private sourceIndex = -1;
  private source: CdkDropList | undefined;

  constructor(public element: ElementRef<HTMLElement>, @Self() private cdkDropListGroup: CdkDropListGroup<any>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdkDropListGroup._items.forEach((i: CdkDropList) => {
      i.orientation = this.orientation;
      i.element.nativeElement.style.flexDirection = this.orientation === 'horizontal' ? 'row' : 'column';
    });
  }

  onDropListDropped() {
    if (this.sourceIndex < 0 || this.targetIndex < 0) {
      return;
    }
    // if sourceIndex is before targetIndex then the real target should minus one, to remove the source placeholder which being counted.
    const target = this.targetIndex + (this.sourceIndex < this.targetIndex ? -1 : 0);
    if (this.sourceIndex !== this.targetIndex && target >= 0) {
      if (this.itemList) {
        moveItemInArray(this.itemList, this.sourceIndex, target);
      } else {
        this.dropped.emit({ previousIndex: this.sourceIndex, currentIndex: target });
      }
      this.sourceIndex = -1;
      this.targetIndex = -1;
    }
    // reset
    this.source = undefined;
  }

  onDropListEntered({ item, container, currentIndex }: CdkDragEnter | CdkDragSortEvent) {
    // dropList which the cdkDrag currently entered.
    const dropElement = container.element.nativeElement;
    // get all the dropList nodes in dropListGroup
    const dropListNodes = Array.from(dropElement.parentElement?.children ?? []);
    // dropList which the cdkDrag originally belonged.
    const sourceElement = item.dropContainer.element.nativeElement;

    // might enter multiple dropList after drag start, should only keep the index from the first time
    if (!this.source || this.sourceIndex === -1) {
      this.sourceIndex = dropListNodes.indexOf(sourceElement);
      this.source = item.dropContainer;
    }
    // target index should consider the currentIndex, which indicate drop before/after dropIndex (index of dropList which currently entered).
    this.targetIndex = dropListNodes.indexOf(dropElement) + currentIndex;
  }
}

@Directive({
  selector: '[cdkDropList][mixedCdkDropList]',
})
export class MixedCdkDropListDirective implements OnInit, OnDestroy {
  lifecycleEmitter = new Subject<void>();

  constructor(@Self() private cdkDropList: CdkDropList, @SkipSelf() private mixedDragDrop: MixedCdkDragDropDirective, private config: MixedDragDropConfig) {
  }

  ngOnInit() {
    this.cdkDropList.autoScrollStep = this.config.autoScrollStep;
    this.cdkDropList.orientation = this.mixedDragDrop.orientation;
    this.cdkDropList.element.nativeElement.style.flexDirection = this.mixedDragDrop.orientation === 'horizontal' ? 'row' : 'column';
    this.cdkDropList.element.nativeElement.style.display = 'flex';
    this.cdkDropList.element.nativeElement.style.flexWrap = 'nowrap';
    this.cdkDropList.element.nativeElement.style.width = 'fit-content';
    this.cdkDropList.element.nativeElement.style.height = 'fit-content';
    this.cdkDropList.sorted
      .pipe(takeUntil(this.lifecycleEmitter))
      .subscribe(event => this.mixedDragDrop.onDropListEntered(event));
    this.cdkDropList.entered
      .pipe(takeUntil(this.lifecycleEmitter))
      .subscribe(event => this.mixedDragDrop.onDropListEntered(event));
    this.cdkDropList.dropped
      .pipe(takeUntil(this.lifecycleEmitter))
      .subscribe(() => this.mixedDragDrop.onDropListDropped());
  }

  ngOnDestroy() {
    this.lifecycleEmitter.next();
    this.lifecycleEmitter.unsubscribe();
  }
}

@Directive({
  selector: '[cdkDrag][mixedCdkDragSizeHelper]',
})
export class MixedCdkDragSizeHelperDirective implements AfterViewInit, OnChanges {
  /** @param {number} percentWidth: set width to the percentage based on the dropListGroup Container width, valid from 0 to 100. **/
  @Input() percentWidth: number | undefined;
  /** @param {number} percentHeight: set width to the percentage based on the dropListGroup Container width, valid from 0 to 100. **/
  @Input() percentHeight: number | undefined;

  constructor(@Self() private cdkDrag: CdkDrag, @SkipSelf() private mixedContainer: MixedCdkDragDropDirective) {
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resize();
  }

  ngAfterViewInit() {
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resize();
  }

  private resize() {
    if (this.percentWidth && !!Number(this.percentWidth)) {
      this.cdkDrag.element.nativeElement.style.width = `${this.mixedContainer.element.nativeElement.offsetWidth * this.percentWidth / 100}px`;
    } else {
      this.cdkDrag.element.nativeElement.style.width = '';
    }
    if (this.percentHeight && !!Number(this.percentHeight)) {
      this.cdkDrag.element.nativeElement.style.height = `${this.mixedContainer.element.nativeElement.offsetHeight * this.percentHeight / 100}px`;
    } else {
      this.cdkDrag.element.nativeElement.style.height = '';
    }
  }
}
