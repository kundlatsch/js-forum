import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../services/forum-api';

function Post() {

  let { id } = useParams();

  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");

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
          commentBody: reply
        };
        setReplies([...replies, replyToAdd]);
        setReply("");
      }
    }); 
  }

  return (
    <div className="postPage">
      <div className="mainPost">
        <h2>{post.title}</h2>
        <div className="postAuthor">Author: {post.username}</div>
        <span>{post.postText}</span>
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
