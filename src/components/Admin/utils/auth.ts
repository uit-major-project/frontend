import Cookies from 'js-cookie';

function adminLogin(username: string, password: string) {
  // add data in local storage
  localStorage.setItem('admin_username', username);
  localStorage.setItem('admin_password', password);

  // signin confirmation cookie
  Cookies.set('admin_signin', 'true');
}

function adminLogout() {
  // remove data from local storage
  localStorage.removeItem('admin_username');
  localStorage.removeItem('admin_password');

  // remove signin confirmation cookie
  Cookies.remove('admin_signin');
}

function adminIsLoggedIn() {
  // check if signin confirmation cookie is set

  return Cookies.get('admin_signin') === 'true';
}

function getLoggedInAdminDetails() {
  // get data from local storage
  const username = localStorage.getItem('admin_username') || '';
  const password = localStorage.getItem('admin_password') || '';

  // return data
  return {
    username,
    password,
  };
}

export { adminLogin, adminLogout, adminIsLoggedIn, getLoggedInAdminDetails };
