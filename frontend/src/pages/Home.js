import React from 'react'
import api from '../services/forum-api';
import {  useEffect, useState } from "react";


function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      let data = res.data
      data.map((post) => {
        if (post.postText.length > 347) {
          post.postText = post.postText.substring(0, 347) + "..." 
        }
      })
      setPosts(data);
    });
  }, []);

  return (
    <div className="posts">
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
  )
}

export default Home
