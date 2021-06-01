import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../services/forum-api';
import { AuthContext } from '../helpers/AuthContext';
import FormDialog from '../components/FormDialog';

function Post() {

  let { id } = useParams();

  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    info: "",
    textField: "",
  });
  const [dialogReturn, setDialogReturn] = useState("");
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

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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

  const editPost = () => {
    setDialogConfig({
      title: "Edit title",
      info: "Enter a new title for the post:",
      textField: "text",
    })
    handleClickDialogOpen();
  }

  const handleEditTitle = (value) => {
    setDialogReturn(value);
    setPost({...post, title: value});
    api.put("/posts/title", {
        title: value,
        id,
      }, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
    });
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
    <>
    <FormDialog 
      open={dialogOpen} 
      handleClose={handleDialogClose} 
      title={dialogConfig.title}
      info={dialogConfig.info}
      textField={dialogConfig.textField}
      handleReturn={handleEditTitle}
    />
    <div className="postPage">
      <div className="mainPost">
        <h2 onClick={() => {
          if (authState.username === post.username) {
            editPost();
          }
        }}>{post.title}</h2>
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
    </>
  )
}

export default Post
