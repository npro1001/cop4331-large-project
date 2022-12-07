import React, { useState } from "react";
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import defaultPFP from '../../img/default-profile.png'
import DeleteModal from '../deleteModal/DeleteModal'
import { useEffect } from "react";
import SongCard from "../SongCard/SongCard";
import { UilTimes } from '@iconscout/react-unicons'
import { useParams } from 'react-router-dom';
import { likePost, unlikePost } from "../../features/post/postSlice"

const Post = ({ data }) => {

    const [modalOpened, setModalOpened] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [isSong, setIsSong] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [picture, setPicture] = useState()
    const [profileImage, setProfileImage] = useState();
    const [isPFP, setIsPFP] = useState();

    const [activeUser, setActiveUser] = useState({})
    const params = useParams();
    const profileUsername = params.username;
    let profileUser;
    const dispatch = useDispatch();

    const fetchProfileUser = async () => {
        setActiveUser(user);
    }

    useEffect(() => {
        fetchProfileUser()
    },[user]);

    useEffect(() => {
        //console.log(data.id)
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


        if (data.profileImage) {

            if(data.profileImage.data)
            {
                var base64String = btoa(new Uint8Array(data.profileImage.data.data).reduce(
                    function (imgData, byte) {
                        return imgData + String.fromCharCode(byte);
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


        if (data.song) {
            setIsSong(true)
        }
    }, [])

    const ChangeLike = async () => {
    
        if (!data.liked)
        {
            const postId = data.id
            const userId = user._id
            await dispatch(likePost(postId))
                .then( (response) =>{
                    console.log(response.payload)
                    window.location.reload()
                })
        }
        else
        {
            await dispatch(unlikePost(data.id, user._id))
                .then( (response) =>{
                    console.log(response)
                    window.location.reload()
                })
        }
    }

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

                {(user.username === data.username)
                ? 
                <div className="options" onClick={() => setModalOpened(true)}>
                    <UilTimes/>
                    <DeleteModal modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        post={data}
                        />
                </div>
                : ""}

            </div>

            {isSong ? <SongCard
                name={data.song}
                artist1={data.artist}
                image={data.image}
                url={data.url}
            ></SongCard> : ""
            }
            {isImage ? <img src={`data:image/png;base64,${picture}`} alt="user image" /> : ""}
            <div className="postReact">
                <img src={data.liked ? Heart : NotLike} alt="" onClick={ChangeLike}/>
                {/* <img src={Comment} alt="" />
                <img src={Share} alt="" /> */}
            </div>

            <span style={{ color: "var(--gray)", fontSize: '13px' }}>{data.likes} likes</span>
        </div>
    )
}

export default Post