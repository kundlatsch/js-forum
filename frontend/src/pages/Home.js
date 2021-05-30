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

  const likeAPost = async (PostId) => {
    const res = await api.post("/likes", { PostId }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });

    setPosts(posts.map((post) => {
      if (post.id === PostId) {
        if (res.data.liked) {
          return {
            ...post,
            Likes: [...post.Likes, "+1"]
          }
        }
        else {
          const likeArray = post.Likes;
          likeArray.pop();
          return {
            ...post,
            Likes: likeArray,
          }
        }
        
      }
      else {
        return post;
      }
    }));
  }

  return (
    <div className="posts">
      {
        posts.map((value, key) => {
          return (
            <div key={key} className="post">
                <div 
                  className="title"
                  onClick={() => {
                    history.push(`/post/${value.id}`)
                  }}
                >
                {value.title}
                </div>

                <div 
                  className="body"
                  onClick={() => {
                    history.push(`/post/${value.id}`)
                  }}
                >
                {value.postText}
                </div>

                <div className="footer">
                {value.username}
                <button onClick={() => {
                  likeAPost(value.id);
                }}> Like</button>
                <label>{value.Likes.length}</label>
                </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default Home
