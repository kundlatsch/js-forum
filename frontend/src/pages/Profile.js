import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/forum-api';


function Profile() {

  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    api.get(`/auth/info/${id}`).then((res) => {
      setUsername(res.data.username);
    });

    api.get(`/posts/byUserId/${id}`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  const navigateToPost = (id) => {
    history.push(`/post/${id}`);
  };

  return (
    <div className="profilePage">
      <div className="defaultContainer" id="profileInfo">
        <h1>{username}</h1>
      </div>
      
      <div className="defaultContainer" id="profilePosts">
        <h1>User Posts</h1>
        {
          listOfPosts.map((post, key) => {
            return (
              <div
                key={key}
                className={"profilePagePost"}
                onClick={() => {
                  navigateToPost(post.id);
                }}
              >
                {post.title}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile
