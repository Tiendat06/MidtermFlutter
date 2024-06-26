import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';
import { alert, prompt } from '@nativescript/core';


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
      // {id: '2', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.', hidden: 'collapsed'},
      // {id: '3', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.', hidden: 'collapsed'},
      // {id: '4', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.', hidden: 'collapsed'},
      // {id: '1', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.', hidden: 'collapsed'},
      // {id: '5', title: 'Function in C', content: 'A function is a block of code which only runs when it is called.', hidden: 'collapsed'},
    ];

    const jsonList = ApplicationSettings.getString("list");

    if (jsonList) {
        list = JSON.parse(jsonList);
        // console.log(list);
    } else {
        const jsonList = JSON.stringify(list);
        ApplicationSettings.setString("list", jsonList);
    }
    console.log(list);

    // console.log(isLock);
    // if(isLock){
    //   console.log("OK");
    //   viewModel.set('hidden', 'visible');
    // }else{
    //   viewModel.set("NO");
    //   viewModel.set('hidden', 'collapsed');
    // }
    // const isLock = ApplicationSettings.getBoolean("isLock");
    // var isHidden = 'collapsed';
    // if(isLock){
    //   isHidden = 'visible';
    // }

    // list = list.map(item => {
    //   return { ...item, hidden: isHidden };
    // });

    // console.log(list);

    viewModel.set('items', new ObservableArray(list));

    // viewModel.set('hidden', isHidden);

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

export function protectActions(args){

    const page = args.object.page;

    const jsonList = ApplicationSettings.getString("list");
    var list = [];
    var stackLayouts = [];
    if (jsonList) {
      list = JSON.parse(jsonList);
      // console.log(list);
    }
    let stackLayout = null;

    const isLock = ApplicationSettings.getBoolean("isLock");
    const password = ApplicationSettings.getString("password");

    // let layout = page.getViewById("4")
    // if(isLock == true){
    //   layout.visibility = "collapsed";
    //   layout.visibility = "visible";
    // }else{
    //   layout.visibility = "visible";
    //   layout.visibility = "collapsed";
    // }
    if(password){

      if(isLock == true){
        prompt({
          title: 'Password Confirmation',
          message: 'Do you want to unlock these notes?',
          okButtonText: 'OK',
          neutralButtonText: 'Cancel',
          cancelable: true,
          inputType: 'password',
        }).then((result) => {
          if(result.text == password){
            ApplicationSettings.setBoolean("isLock", false);
            console.log("OK unlock");
            list.forEach( item =>  {
              item.hidden = "collapsed";
            });
            const jsonLists = JSON.stringify(list);
            ApplicationSettings.setString("list", jsonLists);
            page.frame.navigate('~/components/views/main/main-page');

            alert({
              title: 'Notice!',
              message: 'Unlock successfully',
              okButtonText: 'OK',
            })
          } else{
            alert({
              title: 'Notice!',
              message: 'Unlock failed',
              okButtonText: 'OK',
            })
          }
        })
      } else{
        prompt({
          title: 'Password Confirmation',
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
            list.forEach( item =>  {
              item.hidden = "visible";
            });
            const jsonLists = JSON.stringify(list);
            ApplicationSettings.setString("list", jsonLists);
            page.frame.navigate('~/components/views/main/main-page');

            alert({
              title: 'Notice!',
              message: 'Lock successfully',
              okButtonText: 'OK',
            })
          }else{
            alert({
              title: 'Notice!',
              message: 'Lock failed',
              okButtonText: 'OK',
            })
          }
        })
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
        ApplicationSettings.setBoolean("isLock", true);
        ApplicationSettings.setString("password", result.text);
        list.forEach( item =>  {
          item.hidden = "visible";
        });
        const jsonLists = JSON.stringify(list);
        ApplicationSettings.setString("list", jsonLists);
        page.frame.navigate('~/components/views/main/main-page');

        alert({
          title: 'Notice!',
          message: 'Lock successfully',
          okButtonText: 'OK',
        })
      }else{
        alert({
          title: 'Notice!',
          message: 'Lock failed',
          okButtonText: 'OK',
        })
      }
    })
  }

}

export function createNewPassword(){
  login({
    title: 'Create password',
    message: 'Your password must at least 6 characters',
    okButtonText: 'OK',
    passwordHint: 'Confirm password',
    userNameHint: 'New password',
  }).then((result) => {
    if(result.userName == result.password && result.userName.length > 6){
      ApplicationSettings.setString("password", result.userName);
      alert({
        title: 'Notice!',
        message: 'Update password successfully',
        okButtonText: 'OK',
      })
    }else if(result.userName.length <= 6){
      alert({
        title: 'Notice!',
        message: 'Update password failed',
        okButtonText: 'OK',
      })
    }
  })
}