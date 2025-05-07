import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Self,
  SimpleChanges,
  SkipSelf,
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

export interface MixedCdkDragContainerSize { drag: CdkDrag; containerSize: DOMRectReadOnly };

@Directive({
    selector: '[cdkDropListGroup][mixedCdkDragDrop]',
    standalone: true
})
export class MixedCdkDragDropDirective<T = any> implements OnChanges, AfterViewInit, OnDestroy {
  /** @param {EventEmitter} dropped: emit previousIndex and currentIndex when dropList dropped. Valid when itemList is not being provided. **/
  @Output() readonly dropped = new EventEmitter<{ previousIndex: number; currentIndex: number }>();

  @Input() itemList: T[] | undefined;
  @Input() orientation: DropListOrientation = 'horizontal';
  @Input() containerSelector = '';

  private readonly _resizeDragItem = new Set<MixedCdkDragSizeHelperDirective>();

  private targetIndex = -1;
  private sourceIndex = -1;
  private source: CdkDropList | undefined;
  private observer: ResizeObserver | undefined;
  private currentContentRect: DOMRectReadOnly | undefined;
  private animationFrame: number | undefined;

  constructor(public element: ElementRef<HTMLElement>, @Self() private cdkDropListGroup: CdkDropListGroup<CdkDropList<T>>) {
    this.observer = new ResizeObserver((entries: Array<ResizeObserverEntry>) => {
      this.animationFrame = window.requestAnimationFrame(() => {
        if (entries.length) {
          const element = this.containerSelector
            ? entries[0]
            : entries.find((e: ResizeObserverEntry) => e.target === this.element.nativeElement);
          if (element) {
            this.currentContentRect = element.contentRect;
            for (let item of this._resizeDragItem) {
              item.onSizeChangeEmit(element.contentRect);
            }
          }
        }
      });
    });
  }

  ngAfterViewInit() {
    this.observeAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orientation']) {
      this.cdkDropListGroup._items.forEach((i: CdkDropList<T>) => {
        i.orientation = this.orientation;
        i.element.nativeElement.style.flexDirection = this.orientation === 'horizontal' ? 'row' : 'column';
      });
    }
    if (changes['containerSelector']) {
      this.observer?.disconnect();
      this.observeAll();
    }
  }

  addResizeDragItem(item: MixedCdkDragSizeHelperDirective) {
    this._resizeDragItem.add(item);
    if (this.currentContentRect) {
      item.onSizeChangeEmit(this.currentContentRect);
    }
  }

  deleteResizeDragItem(item: MixedCdkDragSizeHelperDirective) {
    this._resizeDragItem.delete(item);
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
        this.dropped.emit({
          previousIndex: this.sourceIndex,
          currentIndex: target,
        });
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

  private observeAll() {
    if (this.containerSelector) {
      const el = document.querySelector(this.containerSelector);
      if (el) {
        this.observer?.observe(el);
      }
    } else {
      this.observer?.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.observer = undefined;
    this.currentContentRect = undefined;
    this._resizeDragItem.clear();
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }
}

@Directive({
    selector: '[cdkDropList][mixedCdkDropList]',
    standalone: true
})
export class MixedCdkDropListDirective implements OnInit, OnDestroy {
  private lifecycleEmitter = new Subject<void>();

  constructor(
    @Self() private cdkDropList: CdkDropList,
    @SkipSelf() private mixedDragDrop: MixedCdkDragDropDirective,
    private config: MixedDragDropConfig
  ) {
  }

  ngOnInit() {
    this.cdkDropList.autoScrollStep = this.config.autoScrollStep;
    this.cdkDropList.orientation = this.mixedDragDrop.orientation;
    this.cdkDropList.element.nativeElement.style.flexDirection =
      this.mixedDragDrop.orientation === 'horizontal' ? 'row' : 'column';
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
    standalone: true
})
export class MixedCdkDragSizeHelperDirective implements AfterViewInit, OnDestroy {
  @Output() contentBoxSize = new EventEmitter<MixedCdkDragContainerSize>();

  constructor(@Self() private cdkDrag: CdkDrag, @SkipSelf() private mixedContainer: MixedCdkDragDropDirective) {
  }

  ngAfterViewInit() {
    this.mixedContainer.addResizeDragItem(this);
  }

  ngOnDestroy() {
    this.mixedContainer.deleteResizeDragItem(this);
  }

  onSizeChangeEmit(rect: DOMRectReadOnly) {
    this.contentBoxSize?.emit({ drag: this.cdkDrag, containerSize: rect } as MixedCdkDragContainerSize);
  }

  /** @param event :{MixedCdkDragContainerSize} contentSize observer event.
   *  @param percentWidth :{number} set width to the percentage based on the dropListGroup Container width, valid from 0 to 100.
   *  @param percentHeight :{number} set width to the percentage based on the dropListGroup Container width, valid from 0 to 100. **/
  static defaultEmitter(
    event: MixedCdkDragContainerSize,
    percentWidth: number,
    percentHeight: number
  ) {
    if (percentWidth) {
      event.drag.element.nativeElement.style.width = `${(percentWidth * event.containerSize.width) / 100}px`;
    } else {
      event.drag.element.nativeElement.style.width = '';
    }
    if (percentHeight) {
      event.drag.element.nativeElement.style.height = `${(percentHeight * event.containerSize.height) / 100}px`;
    } else {
      event.drag.element.nativeElement.style.height = '';
    }
  }
}
