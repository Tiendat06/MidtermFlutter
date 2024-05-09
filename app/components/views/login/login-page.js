import { dataOnLoginPage } from '../../views-model/login-view-model';

export function onNavigatingToLogin(args) {
  const page = args.object;
  page.addCssFile('./login-page.css');
    // Trích xuất dữ liệu từ navigationContext của trang hiện tại
    const navigationContext = page.navigationContext;
    const itemsFromPreviousPage = navigationContext && navigationContext.items ? navigationContext.items : [];
  
    // Tạo context cho trang login và truyền dữ liệu items từ trang trước đó
    const context = {
      items: itemsFromPreviousPage
    };
    console.log(context);
  page.bindingContext = dataOnLoginPage(context);
}

export function goBack(args){
  const btn = args.object;
  const page = btn.page;

  page.frame.goBack();
}
