import { createViewModel, onDoubleTapDelete, protectActions, createNewPassword } from '../../views-model/main-view-model';
import { alert, confirm, prompt, action, login } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';
// import { Toasty } from 'nativescript-toasty';

export function onNavigatingTo(args) {
  const page = args.object;
  // ApplicationSettings.setBoolean("isLock", false);
  // ApplicationSettings.remove("password");

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

  var title = '';
  var content = '';

  var list = [];
  var jsonList = ApplicationSettings.getString("list");
  list = JSON.parse(jsonList);

  list.forEach(item => {
    if(item.id == itemId){
      console.log(item);
      title = item.title;
      content = item.content;
    }
  })
  
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
        ApplicationSettings.setString("title", title);
        ApplicationSettings.setString("content", content);

        page.frame.navigate(navigationEntry);
      }else{
        alert({
          title: 'Notice!',
          message: 'Invalid password',
          okButtonText: 'OK',
        })
      }
    })
  }else{
    ApplicationSettings.setString("title", title);
    ApplicationSettings.setString("content", content);
    page.frame.navigate(navigationEntry);
  }

}

export function onItemDoubleTap(args) {
    const password = ApplicationSettings.getString("password");
    const isLock = ApplicationSettings.getBoolean("isLock");

    const tappedItem = args.object.bindingContext;
    const page = args.object.page;
    const itemId = tappedItem.id;

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
          confirm({
            title: "Delete Confirmation",
            message: "Do you want to delete this note ?",
            okButtonText: "Sure",
          }).then((result) => {
            if(result){
              onDoubleTapDelete(args, itemId);
            }
          });
        }else{
          alert({
            title: 'Notice!',
            message: 'Invalid password',
            okButtonText: 'OK',
          })
        }
      })
    } else{
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
}

export function onActionItemTap(args){
  const password = ApplicationSettings.getString("password");
  const isLock = ApplicationSettings.getBoolean("isLock");
  var items = "Protect actions";

  if(isLock == true){
    items = "Unlock actions";
  }

  action({
    title: 'Settings',
    message: 'Choose your action:',
    cancelButtonText: 'Cancel',
    actions: ['Create new password', items],
    cancelable: true,
    destructiveActionsIndexes: [2],
  }).then((result) => {
    if(result == "Create new password"){
      if(password){
        prompt({
          title: 'Password Confirmation',
          message: 'Enter pasword',
          okButtonText: 'OK',
          neutralButtonText: 'Cancel',
          cancelable: true,
          inputType: 'password',
        }).then((result) => {
          if(result.text == password){
            createNewPassword();
          }
        })
      } else{
        createNewPassword();
      }
      
    }else if(result == items){
      protectActions(args);
    }
  })
}
