import React, { useState } from "react";
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import defaultPFP from '../../img/default-profile.png'
import ImageModal from '../imageModal/ImageModal'
import { useEffect } from "react";
import SongCard from "../SongCard/SongCard";

const Post = ({ data }) => {

    const [modalOpened, setModalOpened] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [isSong, setIsSong] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [picture, setPicture] = useState()
    const [profileImage, setProfileImage] = useState();
    const [isPFP, setIsPFP] = useState();

    useEffect(() => {
        console.log(data)
        if (data.img.data) {

            setIsImage(true)
            const base64String  = btoa(new Uint8Array(data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));
            
            setPicture(base64String)
        }

        else
        {
       
            setIsImage(false)
        }


        if (user.profilePicture) {
          
            if(user.profilePicture.data)
            {
                var base64String = btoa(new Uint8Array(user.profilePicture.data.data).reduce(
                    function (data, byte) {
                        return data + String.fromCharCode(byte);
                    },
                    ''
                ));
    
                setProfileImage(base64String);
    
                setIsPFP(true);
            }

            else{
                setIsPFP(false)
            }
            
        }
        else {
            setIsPFP(false)
        }


        //until post has a picture picture key
        setIsPFP(false)


        if (data.song) {
            setIsSong(true)
        }
    }, [])

    return (
        <div className="Post">
            <div className="postInfo">
                {isPFP ? <img src={`data:image/png;base64,${profileImage}`} alt="userCover" /> : <img src={defaultPFP} alt="defaultPFP" />}
                <div className="content">
                    <div>
                        <span><b>{data.name}</b></span>
                        <span> @{data.username}</span>
                    </div>

                    <span> {data.caption}</span>
                </div>
            </div>

            {isSong ? <SongCard
                name={data.song}
                artist1={data.artist}
                image={data.image}
                url={data.url}
            ></SongCard> : ""
            }
            {isImage ? <img src={`data:image/png;base64,${picture}`} alt="user image" onClick={() => setModalOpened(true)} /> : ""}
            <div className="postReact">
                <img src={data.liked ? Heart : NotLike} alt="" />
                {/* <img src={Comment} alt="" />
                <img src={Share} alt="" /> */}
            </div>

            <span style={{ color: "var(--gray)", fontSize: '13px' }}>{data.likes} likes</span>
        </div>
    )
}

export default Post