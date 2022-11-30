import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import defaultPFP from '../../img/default-profile.png'
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilMusic } from '@iconscout/react-unicons'
import { UilListUl } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'

const PostShare = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const desc = useRef();
    const imageRef = useRef();
    const { user } = useSelector((state) => state.auth);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const newPost = {
            author: user._id,
            caption: desc.current.value,
        };

        

        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;
            console.log(newPost);
            
        }

        /*
        await fetch(`/api/post`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-for-urlencoded",
            },
            body: newPost
        }) */ 
    };

    return (
        <div className="PostShare">
            <img src={user.PFP
                ? user.PFP
                : defaultPFP} alt="Profile picture" />
            <div>
                <div className="status">
                    <input type="text" placeholder="What's happening?" ref={desc} required/>
                    <button className="status-button" onClick={handleUpload}>
                        Share
                    </button>
                </div>
                <div className="postOptions">
                    <div className="option"
                        style={{ color: "#CDBEE0" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option"
                        style={{ color: "#62929E" }}
                    >
                        <UilMusic />
                        Song
                    </div>
                    <div className="option"
                        style={{ color: "#B2675E" }}
                    >
                        <UilListUl />
                        Playlist
                    </div>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                )}

            </div>
        </div>
    )
}

export default PostShare