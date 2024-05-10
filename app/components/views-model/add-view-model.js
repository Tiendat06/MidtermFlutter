import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';


export function createViewModel() {
  const viewModel = new Observable();
  


  return viewModel;
}

export function onAddTap(args){
    const page = args.object.page;
    const titleTextField = page.getViewById("title");
    const contentTextView = page.getViewById("content");

    const titleValue = titleTextField.text; 
    const contentValue = contentTextView.text; 

    const jsonList = ApplicationSettings.getString("list");
    let list = [];
    let maxID = 0;
    if(jsonList){
        list = JSON.parse(jsonList);
        console.log(list);

        list.forEach(item => {
            const itemId = parseInt(item.id);
            if (itemId > maxID) {
                maxID = itemId;
            }        
        })
    }

    let newID = maxID + 1;
    let newItem = { id: newID.toString(), title: titleValue, content: contentValue };

    list.push(newItem);
    var updateJsonList = JSON.stringify(list);
    ApplicationSettings.setString("list", updateJsonList);
    page.frame.goBack();
}