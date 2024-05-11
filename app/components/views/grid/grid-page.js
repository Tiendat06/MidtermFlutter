import { createViewModelGrid } from '../../views-model/grid-view-model';
import { alert, confirm } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export function onNavigatingToGrid(args) {
  const page = args.object;
  page.addCssFile('./grid-page.css');
  page.bindingContext = createViewModelGrid();
}