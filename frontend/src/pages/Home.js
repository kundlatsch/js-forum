import React from 'react'
import api from '../services/forum-api';
import {  useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from '../helpers/AuthContext';

function Home() {

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {

    if (!localStorage.getItem("accessToken")) {
      history.push('/login');
      return;
    }

    api.get(
      "/posts",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    ).then((res) => {
      const data = res.data.listOfPosts;
      data.map((post) => {
        if (post.postText.length > 400) {
          post.postText = post.postText.substring(0, 397) + "..." 
        }
      })
      setLikedPosts(res.data.likedPosts.map((like) => {
        return like.PostId;
      }));
      setPosts(data);
    });
  }, []);


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

    if (likedPosts.includes(PostId)) {
      setLikedPosts(likedPosts.filter((id) => {
        return id != PostId;
      }));
    }
    else {
      setLikedPosts([...likedPosts, PostId]);
    }
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
                <span>{value.username}</span>
                <ThumbUpAltIcon 
                  id={
                    likedPosts.includes(value.id) ? "unlikeBtn" : "likeBtn"
                  } 
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                />
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
