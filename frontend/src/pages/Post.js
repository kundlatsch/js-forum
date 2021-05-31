import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../services/forum-api';
import { AuthContext } from '../helpers/AuthContext';

function Post() {

  let { id } = useParams();

  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    api.get(`/posts/byId/${id}`).then((res) => {
      setPost(res.data);
    });

    api.get(`/comments/${id}`).then((res) => {
      setReplies(res.data);
    });
  }, []);

  const addReply = () => {
    api.post('/comments', {
      commentBody: reply,
      PostId: id,
    },
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((res) => {
      if (res.data.error) {
        alert("Error trying to comment!");
      }
      else {
        const replyToAdd = {
          username: res.data.username,
          id: res.data.id,
          commentBody: reply
        };
        setReplies([...replies, replyToAdd]);
        setReply("");
      }
    }); 
  };

  const deletePost = async (id) => {
    await api.delete(`posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });

    history.push("/");
  }

  const deleteReply = (id) => {
    api.delete(`/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then(() => {
      setReplies(replies.filter((reply) => {
        return reply.id != id;
      }))
    });
  };

  return (
    <div className="postPage">
      <div className="mainPost">
        <h2>{post.title}</h2>
        <div className="postAuthor">Author: {post.username}</div>
        <span>{post.postText}</span>

        {
          authState.username === post.username && (
            <button 
              id="deletePost"
              onClick={() => {
                deletePost(post.id);
              }}
            >
              Delete Post
            </button>
          )
        }

      </div>
      <hr></hr>
      <div className="postReplies">

        <span>Discussion</span>

        <div className="repliesList">
          {replies.map((value, key) => {
            return (
              <div key={key} className="reply">
                <div className="username">
                  <label>{`${value.username} says:`}</label>
                </div>
                <br></br>
                {value.commentBody}
                <br></br>
                {authState.username === value.username &&
                  (
                    <button 
                      id="deleteReply"
                      onClick={() => {
                        deleteReply(value.id);
                        }
                      }
                    >
                      X
                    </button>
                  )
                }
                
              </div>
            );
          })}
        </div>


        <div className="replyContainer">
          <textarea 
            type="text" 
            placeholder="Reply the post..."
            value={reply}
            onChange={(e) => {setReply(e.target.value)}}
          >
          </textarea>
          <button 
            id="bluebutton"
            onClick={addReply}
          >
              Reply
          </button>
        </div>

      </div>
    </div>
  )
}

export default Post
