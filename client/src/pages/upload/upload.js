import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './upload.css'

const Upload = () => {
    const [Title, setTitle] = useState('');
    const [des, setdes] = useState('');
    const [image, setimage] = useState([]);
    let navigate = useNavigate()

    const upload = () => {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "nalian");
        axios.post(
          `https://api.cloudinary.com/v1_1/sali-touch/image/upload`,
          
          formData
        ).then((response) => {
          const fileName = response.data.public_id;
          console.log(fileName);
    
          axios.post("http://localhost:8000/uploads", {
            title: Title,
            description: des,
            image: fileName,
            author: localStorage.getItem("username"),
          }).then((res) => {
            //navigate("/");
            console.log(res);
          });
        });
      };

    return (
        <div className='upload'>
           <div className='upload-form'>
            <h2>Create a post</h2>
            <input className='form-items' type='text' placeholder='Title' 
            onChange={(e)=>setTitle(e.target.value)}/>
            <input className='form-items' type='text' placeholder='Description' 
            onChange={(e)=>setdes(e.target.value)}/>
            <input className='form-items'  type='file'
            onChange={(e)=>setimage(e.target.files)} />
        <button className='form-items' onClick={upload}>Upload</button>
        </div>
            
        </div>
    );
}

export default Upload;
