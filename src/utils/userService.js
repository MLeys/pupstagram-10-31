import tokenService from './tokenService';

const BASE_URL = '/api/users/';

// This deals with the type of request the USER may want to make on the client, 
// so what type of http requests the user may make to the express server

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
   // you don't need a header if you are sending multipart/formdata (aka sending a photo), the browser will automatically 
   // detect and append the headers
    body: user // <- user needs to be formData (we did that in the handleSubmit in the SignupPage)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup, 
  getUser,
  logout,
  login
};