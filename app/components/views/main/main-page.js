import { createViewModel, onDoubleTapDelete } from '../../views-model/main-view-model';
import { alert, confirm } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export function onNavigatingTo(args) {
  const page = args.object;
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
  const tappedItem = args.object.bindingContext;
  const page = args.object.page;
  const itemId = tappedItem.id;
  
  const navigationEntry = {
    moduleName: '~/components/views/update/update-page',
    context: {
        items: itemId
    }
};

  page.frame.navigate(navigationEntry);
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
