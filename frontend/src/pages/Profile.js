import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/forum-api';
import { AuthContext } from '../helpers/AuthContext';


function Profile() {

  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);

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

  const changePassword = () => {
    api.put("/auth/changePassword", {
      oldPassword,
      newPassword,
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
      else {
        history.push("/");
      }
    })
  }

  const changeUsername = () => {
    api.put("/auth/changeUsername", {
      newUsername
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
      else {
        setUsername(newUsername);
        setAuthState({...authState, username: newUsername });
        setNewUsername("");
        
      }
    })
  }

  return (
    <div className="profilePage">
      <div className="defaultContainer" id="profileInfo">
        <h1>{username}</h1>

        {
          authState.username === username &&
          (<>
            
            <span className="profileTitle">Update Username</span>
            <input
              type="text"
              placeholder="New Username"
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
            >
            </input>
            <button onClick={changeUsername}>
              Submit
            </button>

            <span className="profileTitle">Update Password</span>
            <input
              type="password"
              placeholder="Current Password"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            >
            </input>
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            ></input>
            <button
              onClick={changePassword}
            >
              Submit
            </button>
            
          </>)

        }

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
