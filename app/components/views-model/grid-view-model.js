import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';


export function createViewModelGrid() {
    const viewModel = new Observable();

    let list = [];

    const jsonList = ApplicationSettings.getString("list");
    console.log('hi world grid');

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
