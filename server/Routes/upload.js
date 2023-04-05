import db from '../dbconfig.js';
import express from 'express';

const uploadRouter = express.Router();


uploadRouter.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;

  db.query(
    "INSERT INTO upload (title, description, image, author) VALUES (?, ?, ?, ?);",
    [title, description, image, author],
    (err, results) => {
      if(err) throw err
      else
      {res.send("Upload successful");}
    }
  );
});

uploadRouter.get("/", (req, res) => {
  db.query("SELECT * FROM upload", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

uploadRouter.get("/byUser/:username", (req, res) => {
  const userName = req.params.username;
  db.query(
    "SELECT * FROM upload WHERE author = ?;",
    userName,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.send(results);
    }
  );
});

uploadRouter.post("/like", (req, res) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;

  db.query(
    "INSERT INTO likes (userliking, postId) VALUES (?,?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "UPDATE upload SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
});

export default uploadRouter;