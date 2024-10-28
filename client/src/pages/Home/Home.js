import React, { useEffect, useState } from 'react';
import './Home.css';
import { Image } from 'cloudinary-react';
import Axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Home = () => {
  const [uploads, setUploads] = useState([]);
  console.log(uploads);
  useEffect(() => {
    if (!localStorage.getItem('isLogin')) {
      localStorage.setItem('isLogin', false);
    }
  }, []);
  useEffect(() => {
    Axios.get('http://localhost:8000/uploads').then((response) => {
      setUploads(response.data);
    });
  }, []);
  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post('http://localhost:8000/uploads/like', {
      userLiking: localStorage.getItem('username'),
      postId: id,
    }).then((response) => {
      setUploads(tempLikes);
    });
  };
  return (
    <div className="Home">
      {uploads.map((val, key) => {
        return (
          <div className="Post">
            <div className="Image">
              <Image cloudName="sali-touch" publicId={val.image} />
            </div>
            <div className="Content">
              <div className="title">
                {' '}
                {val.title} / by @{val.author}
              </div>
              <div className="description">{val.description}</div>
            </div>
            <div className="Engagement">
              <button id="likeButton" onClick={() => likePost(val.id, key)}>
                Like
              </button>
              {val.likes}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
