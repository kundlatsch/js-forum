const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(express.json());
app.use(cors());


const postsRouter = require('./routes/Posts');
app.use("/posts", postsRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);



db.sequelize.sync().then(() => {
    app.listen(3001, () =>{
        console.log('Server listening on port 3001!');
    })
});
