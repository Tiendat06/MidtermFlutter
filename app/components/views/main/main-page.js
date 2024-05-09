import { createViewModel } from '../../views-model/main-view-model';

export function onNavigatingTo(args) {
  const page = args.object;
  page.addCssFile('./main-page.css');
  page.bindingContext = createViewModel();
}

export function onFloatingButtonTaps(args) {
  console.log("hello world");
  const btn = args.object;
  const page = btn.page;  
  const navigationEntry = {
      moduleName: '~/components/views/login/login-page',
      context: {
          items: page.bindingContext.items
      }
  };
  page.frame.navigate(navigationEntry);
}
