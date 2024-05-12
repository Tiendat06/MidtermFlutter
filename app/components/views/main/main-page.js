import { createViewModel, onDoubleTapDelete } from '../../views-model/main-view-model';
import { alert, confirm, prompt } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export function onNavigatingTo(args) {
  const page = args.object;
  ApplicationSettings.setBoolean("isLock", false);

  page.addCssFile('./main-page.css');
  page.bindingContext = createViewModel();
}

export function onFloatingButtonTaps(args) {
  const password = ApplicationSettings.getString("password");
  const isLock = ApplicationSettings.getBoolean("isLock");

  const btn = args.object;
  const page = btn.page;  
  const navigationEntry = {
      moduleName: '~/components/views/add/add-page',
      context: {
          items: page.bindingContext.items
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

  const jsonList = ApplicationSettings.getString("list");
  var list = [];
  var stackLayouts = [];
  if (jsonList) {
    list = JSON.parse(jsonList);
    list.forEach(element => {
      stackLayouts.push(element.id);
    });
  }
  let stackLayout = null;

  let layout = page.getViewById("4")
  layout.visibility = "visible";

  // console.log(stackLayout);

  // 

  // if(password){
    const isLock = ApplicationSettings.getBoolean("isLock");

    if(isLock == true){
       prompt({
        title: 'Password Confirmation',
        message: 'Do you want to unlock these notes?',
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
        cancelable: true,
        inputType: 'password',
      }).then((result) => {
        const password = ApplicationSettings.getString("password");
        if(result.text == password){
          ApplicationSettings.setBoolean("isLock", false);
          console.log("OK unlock");
          layout.visibility = "collapsed";
          stackLayouts.forEach( id =>  {
            // console.log(id);
            stackLayout = page.getViewById(id);
            stackLayout.visibility = "collapsed";
          });
        }
      })
    } else{
      prompt({
        title: 'Set Password',
        message: 'Do you want to lock these notes?',
        okButtonText: 'OK',
        neutralButtonText: 'Cancel',
        cancelable: true,
        inputType: 'password',
      }).then((result) => {
        if(result.text != ""){
          console.log("OK lock");
          ApplicationSettings.setBoolean("isLock", true);
          ApplicationSettings.setString("password", result.text);
          layout.visibility = "visible";
          stackLayouts.forEach( id => {
            // console.log(id);
            stackLayout = page.getViewById(id);
            stackLayout.visibility = "visible";
          });
        }else{
          console.log("empty string");
        }
      })
    }
  // } 
  // else{
  //   prompt({
  //     title: 'Create password',
  //     message: 'Enter pasword',
  //     okButtonText: 'OK',
  //     neutralButtonText: 'Cancel',
  //     cancelable: true,
  //     inputType: 'password',
  //   }).then((result) => {
  //     if(result.text != ""){
  //       // console.log("OK");
  //       ApplicationSettings.setBoolean("isLock", true);
  //       ApplicationSettings.setString("password", result.text);
  //       layout.visibility = "visible";
  //       stackLayouts.forEach( id => {
  //         stackLayout = page.getViewById(id);
  //         stackLayout.visibility = "visible";
  //       });
  //     }
  //   })
  // }
}
