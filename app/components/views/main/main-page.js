import { createViewModel, onDoubleTapDelete } from '../../views-model/main-view-model';
import { alert, confirm, prompt } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';
import { StackLayout, Label, Color } from "@nativescript/core";

export function onNavigatingTo(args) {
  const page = args.object;
  ApplicationSettings.setBoolean("isLock", false);

  page.addCssFile('./main-page.css');
  page.bindingContext = createViewModel();
}

export function onFloatingButtonTaps(args) {
  // console.log("hello world");
  const btn = args.object;
  const page = btn.page;  
  const navigationEntry = {
      moduleName: '~/components/views/add/add-page',
      context: {
          items: page.bindingContext.items
      }
  };
  page.frame.navigate(navigationEntry);
}

export function onItemTap(args){
  const password = ApplicationSettings.getString("password");
  const isLock = ApplicationSettings.getBoolean("isLock");

  const tappedItem = args.object.bindingContext;
  const page = args.object.page;
  const itemId = tappedItem.id;
  
  const navigationEntry = {
    moduleName: '~/components/views/update/update-page',
    context: {
        items: itemId
    }
  };
  if(isLock == true){
    prompt({
      title: 'Password Confirmation',
      message: 'Enter pasword',
      okButtonText: 'OK',
      neutralButtonText: 'Cancel',
      cancelable: true,
      inputType: 'password',
    }).then((result) => {
      if(result.text == password){
        page.frame.navigate(navigationEntry);
      }
    })
  }else{
    page.frame.navigate(navigationEntry);
  }

}

export function onItemDoubleTap(args) {
    const tappedItem = args.object.bindingContext;
    const page = args.object.page;
    const itemId = tappedItem.id;
    confirm({
        title: "Delete Confirmation",
        message: "Do you want to delete this note ?",
        okButtonText: "Sure",
    }).then((result) => {
        if(result){
            onDoubleTapDelete(args, itemId);
        }
    });
}

export function onActionItemTap(args){
  const page = args.object.page;
  let stackLayout = page.getViewById("protect-icon");
  const password = ApplicationSettings.getString("password");

  if(password){
    const isLock = ApplicationSettings.getBoolean("isLock");

    if(isLock){
      prompt({
        title: 'Password Confirmation',
        message: 'Enter pasword',
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
        cancelable: true,
        inputType: 'password',
      }).then((result) => {
        if(result.text == password){
          ApplicationSettings.setBoolean("isLock", false);
          stackLayout.visibility = "collapsed";
        }
      })
    } else{
      confirm({
        title: "Locking Confirmation",
        message: "Do you want to lock your notes ?",
        okButtonText: "Sure",
      }).then((result) => {
          if(result){
            ApplicationSettings.setBoolean("isLock", true);
            stackLayout.visibility = "visible";
          }
      });
    }
  } else{
    prompt({
      title: 'Create password',
      message: 'Enter pasword',
      okButtonText: 'OK',
      neutralButtonText: 'Cancel',
      cancelable: true,
      inputType: 'password',
    }).then((result) => {
      if(result.text != ""){
        console.log("OK");
        ApplicationSettings.setBoolean("isLock", true);
        ApplicationSettings.setString("password", result.text);
        stackLayout.visibility = "visible";
      }
    })
  }

  stackLayout.requestLayout();

}