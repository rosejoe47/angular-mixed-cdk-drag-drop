# AngularMixedCdkDragDrop

angular-mixed-cdk-drag-drop is an Angular `Directive` to support mixed orientation drag drop using angular cdk.

Support Standalone Component and Module.

## Demo

![h_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_h_demo.gif)
![v_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_v_demo.gif)

## Installation

```cmd
npm install angular-mixed-cdk-drag-drop
```

## Versions
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

The official cdkDropList is implement like below.

```html
<div cdkDropList cdkDropListOrientation="horizontal" class="example-list" (cdkDropListDropped)="drop($event)">
  <div class="example-box" *ngFor="let item of items" cdkDrag>{{item}}</div>
</div>
```

To use this mixed orientation directive, we need to put every cdkDrag in an individual cdkDropList and grouped all the dropList in a CdkDropListGroup.
To do so with the following few steps.

1. change the original CdkDropList to CdkDropListGroup, applied `mixedCdkDragDrop` directive and set orientation(required). (the list group need to be a Flex container which set the style display property to flex.)
2. add additional cdkDropList with `mixedCdkDropList` directive as the parent of every cdkDrag.
3. you can now be happy to enjoy the mixed cdk drag drop.

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

When cdkDrag size is originally depend on its container. Applied mixedCdkDragDrop will break the style by adding additional cdkDropList parent element.
MixedCdkDragSizeHelper directive will help to handle the CdkDrag size in this case.
1. Applied mixedCdkDragSizeHelper to cdkDrag.
2. ContentBoxSize emitter is required. (default Emitter MixedCdkDragSizeHelperDirective.defaultEmitter is provided.)
3. Set containerSelector in mixedCdkDragDrop if needed. (default value is mixedCdkDragDrop.)


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
  MixedCdkDragSizeHelperDirective.defaultEmitter(event, Number(this.percentWidth), Number(this.percentHeight));
}
```

## Global settings

You can use MixedCdkDragDropModule.forRoot to define global settings:

```typescript
MixedCdkDragDropModule.forRoot({ autoScrollStep: 4 });
```

## Publish
```cmd
# 1. 確保您在專案根目錄
cd /path/to/your/project

# 2. 構建庫
ng build angular-mixed-cdk-drag-drop

# 3. 切換到構建輸出目錄
cd dist/angular-mixed-cdk-drag-drop

# 4. 檢查 package.json 是否正確
cat package.json

# 5. 發布
npm publish
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
