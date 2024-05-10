import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';


function getMessage(counter) {
    if (counter <= 0) {
      return 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      return `${counter} taps left`;
    }
}

export function createViewModel() {
    const viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    let list = [
      {id: '1', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.'},
      {id: '2', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.'},
      {id: '3', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.'},
      {id: '4', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.'},
      {id: '5', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.'},
    ];

    const jsonList = ApplicationSettings.getString("list");

    if (jsonList) {
        list = JSON.parse(jsonList);
        console.log(list);
    } else {
        const jsonList = JSON.stringify(list);
        ApplicationSettings.setString("list", jsonList);
    }

    viewModel.set('items', new ObservableArray(list))


    return viewModel;
}

export function onDoubleTapDelete(args, itemId){

    const jsonList = ApplicationSettings.getString("list");
    let list = [];

    if (jsonList) {
        list = JSON.parse(jsonList);
        list = list.filter(item => item.id !== itemId);
    }

    var updateJsonList = JSON.stringify(list);
    ApplicationSettings.setString("list", updateJsonList);
    
    const currentPage = args.object.page;
    currentPage.frame.navigate(currentPage.frame.currentEntry);
}
