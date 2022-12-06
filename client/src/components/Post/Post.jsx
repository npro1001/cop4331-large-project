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
        if (data.img.data) {
            console.log(data.caption+" does have a photo attatched")
            console.log(data.img)
            setIsImage(true)
            const base64String  = btoa(new Uint8Array(data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')); 

            // console.log("DATA IMG DATA DATA " + data.img.data.data)
            // console.log("DATA IMG DATA " + data.img.data)
            // console.log("PROFILE PIC" + user.profileImage)
            // console.log("PROFILE IMG DATA" + user.profileImage.data)
            // console.log("PROFILE IMG DATA DATA" + user.profileImage.data.data)
            
            setPicture(base64String)
        }

        else
        {
            console.log(data.caption+" does not have a photo attatched")

            setIsImage(false)
        }


        if (user.profilePicture) {

            var base64String = btoa(new Uint8Array(user.profilePicture.data).reduce(
                function (data, byte) {
                    return data + String.fromCharCode(byte);
                },
                ''
            ));

            setProfileImage(base64String);

            setIsPFP(true);
        }
        else {
            setIsPFP(false)
        }


        if (data.song) {
            setIsSong(true)
        }
    }, [])

    return (
        <div className="Post">
            <div className="postInfo">
                {isPFP ? <img src={`data:image/png;base64,${profileImage}`} alt="userCover" /> : <img src={defaultPFP} alt="defaultCover" />}
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