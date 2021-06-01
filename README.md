# js-forum

A simple forum made using Node, React and Postgres.

**Running locally:**

```
# Start database
docker run -d --name forum -p 5432:5432 postgres:13.3
    # create a database called 'forum' inside this container:
    docker exec -it forum bash
    createdb -U postgres forum
    exit

# Backend
cd backend
npm install
npm start


# Frontend
cd frontend
npm install
npm start
```