import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';

import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: 'standalone',
    loadComponent: () =>
      import('./app/standalone-page/standalone-page.component').then(
        (m) => m.StandalonePageComponent,
      ),
  },
  {
    path: 'module',
    loadChildren: () =>
      import('./app/module-page/module-page.module').then(
        (m) => m.ModulePageModule,
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'standalone' },
  { path: '**', redirectTo: 'standalone' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
