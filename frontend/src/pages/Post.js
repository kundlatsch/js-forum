import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../services/forum-api';

function Post() {

  let { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    api.get(`/posts/byId/${id}`).then((res) => {
      setPost(res.data);
    });
  }, []);

  return (
    <div className="postPage">
      <h2>{post.title}</h2>
      <div className="postFooter">Author: {post.username}</div>
      <span>{post.postText}</span>
    </div>
  )
}

export default Post
