import Cookies from 'js-cookie';

import { userVar } from 'src/apollo/reactiveVars';

export const logout = () => {
  // Cookies.remove('signedin');
  // Cookies.remove('signedin_as_tasker');

  userVar();

  window.location.href = '/';
};
