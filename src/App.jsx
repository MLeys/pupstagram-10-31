import { useState} from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FeedPage from './pages/FeedPage/FeedPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
// import the userService so we have a function (getUser) that can get the jwt token 
// from localstorage and decode it
import userService from './utils/userService';
import PageHeader from './components/PageHeader/PageHeader';


function App() {

  const [user, setUser] = useState(userService.getUser()); // if theres a token, grab it, if not the value will be null


  // we need a function to pass down to LoginPage or the Signup page to be called after 
  // the api request to login or sign up has been made
  function handleSignUpOrLogin(){
    setUser(userService.getUser()) // getUser, gets the jwt from localstorage and decodes it
  }

  function handleLogOut(){
    setUser(userService.logout());
  }

  return (
 
      <Routes>
        <Route path="/" element={<FeedPage loggedUser={user} handleLogOut={handleLogOut} />} />
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} handleLogOut={handleLogOut} />} />
        <Route path='/signup' element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} handleLogOut={handleLogOut} />}/>
        <Route path='/:username' element={<ProfilePage loggedUser={user} handleLogOut={handleLogOut}  />} />
      </Routes>


  );
}

export default App;
