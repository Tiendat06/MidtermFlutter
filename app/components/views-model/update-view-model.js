import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';


export function createUpdateViewModel(context) {
    const viewModel = new Observable();
    let id = '';
    if(context){
        id = context.items;
    }

    const jsonList = ApplicationSettings.getString("list");
    let list = [];
    let items = {};
    if (jsonList) {
        list = JSON.parse(jsonList);
        // console.log(list);

        list.forEach(item => {
            const itemId = parseInt(item.id);
            if (itemId == id) {
                items = item;
            }        
        })
    }
    viewModel.set('id', id);
    viewModel.set('title', items.title);
    viewModel.set('content', items.content);

    // console.log(items.title);
    // console.log(items.content);

    return viewModel;
}

export function onUpdateTap(args){
    const page = args.object.page;
    const titleTextField = page.getViewById("title");
    const contentTextView = page.getViewById("content");
    const idTextView = page.getViewById("update-id");

    const titleValue = titleTextField.text; 
    const contentValue = contentTextView.text; 
    const idValue = idTextView.text; 

    const jsonList = ApplicationSettings.getString("list");
    let list = [];
    let newItems = {id: idValue, title: titleValue, content: contentValue};
    console.log(newItems);
    if (jsonList) {
        list = JSON.parse(jsonList);
        // console.log(list);
        console.log('hi world');

        list.forEach(item => {
            const itemId = parseInt(item.id);
            console.log(itemId);
            if (itemId == idValue) {
                item.title = newItems.title;
                item.content = newItems.content;
            }        
        })
    }

    var updateJsonList = JSON.stringify(list);
    ApplicationSettings.setString("list", updateJsonList);

    page.frame.goBack();
}
