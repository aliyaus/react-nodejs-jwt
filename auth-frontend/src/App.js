import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LoginComponent from './components/LoginComponent';
import SignedInComponent from './components/SignedInComponent';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

const SERVER_URL = "http://localhost:5000";

function App() {

  const [userState, setUser] = useState(null);

  // check user state on first render + anytime userState changes 
  useEffect(() => {
    console.log("checking user state!")
    const currentUser = localStorage.getItem("reactnodejwt-user")
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [])

  const login = (user, pass) => {
    console.log("logging in!")
    axios.post(`${SERVER_URL}/auth`, {
      username: user,
      password: pass
    }, { withCredentials: true }).then((res) => {
      console.log(res)
      toast.success('Successfully logged in!')
      localStorage.setItem("reactnodejwt-user", JSON.stringify(res.data.user))
      setUser(res.data.user);
    }).catch((e) => {
      console.log(e)
      toast.error(e.response.data.message || e.message)
    })
  }

  const logout = () => {
    console.log("logging out!")
    axios.get(`${SERVER_URL}/logout`, { withCredentials: true }, {
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
        localStorage.removeItem("reactnodejwt-user")
        setUser(null);
      }
    }).catch((e) => {
      console.log(e)
      toast.error(e.message)
    })
  }

  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <h1>react-nodejs-jwt</h1>
      </header>

      {!userState ? <LoginComponent login={login} /> : <SignedInComponent user={userState} logout={logout} />}

      <p>Repository available at <a
        className="App-link"
        href="https://github.com/aliyaus/react-nodejs-jwt"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a></p>

    </div>
  );
}

export default App;
