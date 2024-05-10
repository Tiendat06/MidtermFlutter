import { createUpdateViewModel, onUpdateTap } from '../../views-model/update-view-model';
import { ApplicationSettings } from '@nativescript/core';

export function onNavigatingToUpdate(args) {
    const page = args.object;
    page.addCssFile('./update-page.css');

    const navigationContext = page.navigationContext;
    const itemsFromPreviousPage = navigationContext && navigationContext.items ? navigationContext.items : [];

    const context = {
        items: itemsFromPreviousPage
    };
    page.bindingContext = createUpdateViewModel(context);
}

export function goBack(args) {
    const btn = args.object;
    const page = btn.page;  
    page.frame.goBack();
}

export function onUpdatePageTap(args){
    onUpdateTap(args)
}

