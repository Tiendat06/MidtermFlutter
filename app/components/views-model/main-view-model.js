import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';

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

  viewModel.set('items', new ObservableArray(list))


  return viewModel;
}
