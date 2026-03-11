import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/generator/generator').then((mod) => mod.Generator) },
  { path: '**', loadComponent: () => import('./pages/generator/generator').then((mod) => mod.Generator) }, // unknown route redirects to generator
];
