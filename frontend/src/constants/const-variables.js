import Cookies from 'js-cookie';

export const jwt = Cookies.get('jwt') ? Cookies.get('jwt') : false;
export const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : false;
export const authorization = { headers: { Authorization: `Bearer ${jwt}` } };