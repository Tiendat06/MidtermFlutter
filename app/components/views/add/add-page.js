import { onAddTap } from '../../views-model/add-view-model';
import { ApplicationSettings } from "@nativescript/core";

export function onNavigatingTo(args) {
  const page = args.object;
  page.addCssFile('./add-page.css');
//   page.bindingContext = createViewModel();
}

export function goBack(args) {
  const btn = args.object;
  const page = btn.page;  
  page.frame.goBack();
}

export function onAddPageTap(args){
    onAddTap(args);
}
