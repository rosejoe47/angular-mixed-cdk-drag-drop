# AngularMixedCdkDragDrop

angular-mixed-cdk-drag-drop is an Angular `Directive` to support mixed orientation drag drop using angular cdk.

**Recommended API: standalone directives** (+ optional `provideMixedCdkDragDrop()`).  
`MixedCdkDragDropModule` is still supported for existing NgModule apps.

## Demo

![h_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_h_demo.gif)
![v_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_v_demo.gif)

## Installation

```cmd
npm install angular-mixed-cdk-drag-drop
```

## Versions
* for angular 20 use v^2.5.0 / angular20
```cmd
npm install angular-mixed-cdk-drag-drop@angular20
```

* for angular 19 use v^2.4.0 / angular19
```cmd
npm install angular-mixed-cdk-drag-drop@angular19
```

* for angular 18 use v^2.2.4 / angular18
```cmd
npm install angular-mixed-cdk-drag-drop@angular18
```

* for angular 17 use v^2.2.3 / angular17
```cmd
npm install angular-mixed-cdk-drag-drop@angular17
```
* for angular 16 use v^2.1.0 / angular16
```cmd
npm install angular-mixed-cdk-drag-drop@angular16
```
* for angular 15 use v^2.0.0 / angular15
```cmd
npm install angular-mixed-cdk-drag-drop@angular15
```
* for angular 14 use angular14
```cmd
npm install angular-mixed-cdk-drag-drop@angular14
```

## Usage

### Recommended: Standalone

Import the directives directly into your standalone component. Use `provideMixedCdkDragDrop()` when you want to customize config (defaults work without it).

```typescript
import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MixedCdkDragDropDirective,
  MixedCdkDropListDirective,
  MixedCdkDragSizeHelperDirective,
  provideMixedCdkDragDrop,
} from 'angular-mixed-cdk-drag-drop';

@Component({
  standalone: true,
  imports: [
    DragDropModule,
    MixedCdkDragDropDirective,
    MixedCdkDropListDirective,
    MixedCdkDragSizeHelperDirective,
  ],
  providers: [provideMixedCdkDragDrop({ autoScrollStep: 4 })],
  templateUrl: './my.component.html',
})
export class MyComponent {}
```

Compared with the official single `cdkDropList`, this mixed-orientation approach puts every `cdkDrag` in its own `cdkDropList`, then groups them with `cdkDropListGroup` + `mixedCdkDragDrop`:

1. Change the original `CdkDropList` to `CdkDropListGroup`, apply `mixedCdkDragDrop`, and set `orientation` (required). The list group should be a flex container (`display: flex`).
2. Wrap every `cdkDrag` with an additional `cdkDropList` that also has `mixedCdkDropList`.
3. Enjoy mixed-orientation CDK drag and drop.

```html
<div class="example-list"
     cdkDropListGroup mixedCdkDragDrop
     [orientation]="'horizontal'"
     [itemList]="items"
     (dropped)="dropped($event)">
  @for (item of items; track item.id) {
    <span cdkDropList mixedCdkDropList>
      <div class="example-box" cdkDrag>
        {{item}}
        <div cdkDragHandle> = </div>
      </div>
    </span>
  }
</div>
```

### mixedCdkDragSizeHelper

When cdkDrag size originally depends on its container, applying mixedCdkDragDrop can break the style by adding an extra cdkDropList parent.
`MixedCdkDragSizeHelper` helps restore sizing in that case.

1. Apply `mixedCdkDragSizeHelper` to `cdkDrag`.
2. Handle `contentBoxSize` (default helper: `MixedCdkDragSizeHelperDirective.defaultEmitter`).
3. Set `containerSelector` on `mixedCdkDragDrop` if needed (default is the mixedCdkDragDrop host).

```html
<div class="example-list"
     cdkDropListGroup mixedCdkDragDrop
     [containerSelector]="'.example-list'">
  @for (item of items; track item.id) {
    <span cdkDropList mixedCdkDropList>
      <div class="example-box" cdkDrag mixedCdkDragSizeHelper
           (contentBoxSize)="onSizeChange($event)">
        {{item}}
        <div cdkDragHandle> = </div>
      </div>
    </span>
  }
</div>
```

```typescript
onSizeChange(event: MixedCdkDragContainerSize) {
  MixedCdkDragSizeHelperDirective.defaultEmitter(
    event,
    Number(this.percentWidth),
    Number(this.percentHeight),
  );
}
```

## Configuration

`MixedDragDropConfig` controls global behavior. Default `autoScrollStep` is `6`.

If you do not provide a custom config, the library falls back to defaults automatically.

### Standalone (recommended)

Application level:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideMixedCdkDragDrop } from 'angular-mixed-cdk-drag-drop';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideMixedCdkDragDrop({ autoScrollStep: 4 }),
  ],
});
```

Component level:

```typescript
providers: [provideMixedCdkDragDrop({ autoScrollStep: 4 })]
```

### NgModule (compatibility)

For existing NgModule apps, keep using `MixedCdkDragDropModule` / `forRoot()`:

```typescript
import { NgModule } from '@angular/core';
import { MixedCdkDragDropModule } from 'angular-mixed-cdk-drag-drop';

@NgModule({
  imports: [
    MixedCdkDragDropModule.forRoot({ autoScrollStep: 4 }),
  ],
})
export class AppModule {}
```

Or with a standalone bootstrap that still prefers the NgModule API:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { MixedCdkDragDropModule } from 'angular-mixed-cdk-drag-drop';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MixedCdkDragDropModule.forRoot({ autoScrollStep: 4 })),
  ],
});
```

## Publish
```cmd
ng build angular-mixed-cdk-drag-drop
npm publish dist/angular-mixed-cdk-drag-drop
```


## License

```text
Copyright 2025 Rose Chung

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
