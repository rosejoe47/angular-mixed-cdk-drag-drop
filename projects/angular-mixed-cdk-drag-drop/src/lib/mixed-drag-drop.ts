import { Provider } from '@angular/core';

export class MixedDragDropConfig {
  autoScrollStep = 6;
}

export function provideMixedCdkDragDrop(
  config: Partial<MixedDragDropConfig> = {},
): Provider {
  return {
    provide: MixedDragDropConfig,
    useFactory: () => Object.assign(new MixedDragDropConfig(), config),
  };
}
