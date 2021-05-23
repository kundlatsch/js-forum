import {  useEffect, useState } from "react";

import './App.css';
import api from './services/forum-api';


function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="App">
      {
        posts.map((value, key) => {
          return (
            <div className="post">
              <div className="title">
                {value.title}
              </div>

              <div className="body">
                {value.postText}
              </div>

              <div className="footer">
                {value.username}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
