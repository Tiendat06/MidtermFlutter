import { createUpdateViewModel, onUpdateTap } from '../../views-model/update-view-model';
import { ApplicationSettings } from '@nativescript/core';
import { confirm } from '@nativescript/core';

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
    var titleView = page.getViewById("title").text;
    var contentView = page.getViewById("content").text;
    var title = ApplicationSettings.getString("title");
    var content = ApplicationSettings.getString("content");

    if(title == titleView && content == contentView){
        page.frame.goBack();
    }else{
        confirm({
            title: "Save change?",
            message: "Do you want to update this note ?",
            okButtonText: "Sure",
        }).then((result) => {
            if(result){
                onUpdateTap(args);
                page.frame.goBack();
            }
        });
    }
}

export function onUpdatePageTap(args){
    confirm({
        title: "Save change?",
        message: "Do you want to update this note ?",
        okButtonText: "Sure",
    }).then((result) => {
        if(result){
            onUpdateTap(args);
        }
    });
}

