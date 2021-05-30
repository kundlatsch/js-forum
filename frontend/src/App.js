import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import api from './services/forum-api';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    api.get('/auth/validateUser', {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((res) =>{
      if (res.data.error) {
        setAuthState({...authState, status: false });
      }
      else {
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
      setAuthState({username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="topbar">
            <Link to="/">Home</Link>
            <Link to="/createpost">Create a Post</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registration</Link>
              </>
            ) : (
              <>
              <h2 id="username">Welcome, {authState.username}</h2>
              <button 
                id="logout"
                onClick={logout}
              >
                Logout
              </button>
              </>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
