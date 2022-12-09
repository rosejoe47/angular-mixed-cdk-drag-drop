# AngularMixedCdkDragDrop

angular-mixed-cdk-drag-drop is an Angular `Directive` to support mixed orientation drag drop using angular cdk.

## Demo

![h_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_h_demo.gif)
![v_demo](https://github.com/rosejoe47/angular-cdk-mixed-drag-drop/blob/v1/s_v_demo.gif)

## Installation

```angular2html
npm install angular-mixed-cdk-drag-drop
```

## Usage

The official cdkDropList is implement like below.

```angular2html
<div cdkDropList cdkDropListOrientation="horizontal" class="example-list" (cdkDropListDropped)="drop($event)">
  <div class="example-box" *ngFor="let item of items" cdkDrag>{{item}}</div>
</div>
```

To use this mixed orientation directive, we need to put every cdkDrag in an individual cdkDropList and grouped all the dropList in a CdkDropListGroup.
To do so with the following few steps.

1. change the original CdkDropList to CdkDropListGroup, applied `mixedCdkDragDrop` directive and set orientation(required). (the list group need to be a Flex container which set the style display property to flex.)
2. add additional cdkDropList with `mixedCdkDropList` directive as the parent of every cdkDrag.
3. you can now be happy to enjoy the mixed cdk drag drop.

```angular2html
<div class="example-list"
     cdkDropListGroup mixedCdkDragDrop
     [orientation]="'horizontal'"
     [itemList]="items"
     (dropped)="dropped($event)">
        <span *ngFor="let item of items" cdkDropList mixedCdkDropList>
          <div class="example-box" cdkDrag>
                {{item}}
                <div cdkDragHandle> = </div>
            </div>
        </span>
      </div>
```

### mixedCdkDragSizeHelper

When cdkDrag size is originally depend on its container. Applied mixedCdkDragDrop will break the style by adding additional cdkDropList parent element.
MixedCdkDragSizeHelper directive will help to handle the CdkDrag size in this case.
Just applied mixedCdkDragSizeHelper to cdkDrag. (size will depend on the parent cdkDropListGroup container automatically.)

```angular2html
<div class="example-box" cdkDrag mixedCdkDragSizeHelper
               [percentHeight]="percentHeight"
               [percentWidth]="percentWidth">
                {{item}}
                <div cdkDragHandle> = </div>
            </div>
```

## Global settings

You can use MixedCdkDragDropModule.forRoot to define global settings:

```angularjs
MixedCdkDragDropModule.forRoot({ autoScrollStep: 4 });
```

## Publish
```cmd
ng build angular-mixed-cdk-drag-drop
npm publish dist/angular-mixed-cdk-drag-drop
```


## License

```text
Copyright 2022 Rose Chung

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
