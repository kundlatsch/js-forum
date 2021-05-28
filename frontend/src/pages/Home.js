import React from 'react'
import api from '../services/forum-api';
import {  useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      let data = res.data
      data.map((post) => {
        if (post.postText.length > 367) {
          post.postText = post.postText.substring(0, 367) + "..." 
        }
      })
      setPosts(data);
    });
  }, []);

  let history = useHistory();

  return (
    <div className="posts">
      {
        posts.map((value, key) => {
          return (
            <div key={key} className="post" onClick={() => {
              history.push(`/post/${value.id}`)
            }}>
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
