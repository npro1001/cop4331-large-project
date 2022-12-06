import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import defaultPFP from '../../img/default-profile.png'
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilMusic } from '@iconscout/react-unicons'
import { UilListUl } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { createNewPost } from "../../features/post/postSlice";
import { searchTracks } from "../../features/spotify/spotifySlice"
import styled from "styled-components";
import SongCard from "../SongCard/SongCard";
import SpotifyPopUp from "../spotifyModal/SpotifyPopUp";
import { useEffect } from "react";


const PostShare = () => {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);


    const [modalOpened, setModalOpened] = useState(false)
    const [profileImage, setProfileImage] = useState();
    const [song, setSong] = useState(false)
    const [selection, setSelection] = useState()
    const [isPosted, setIsPosted] = useState(true)
    const [isPFP, setIsPFP] = useState();
    const desc = useRef();
    const imageRef = useRef();
    const { user } = useSelector((state) => state.auth);

    const checkPFP = () => {

        if (user.profilePicture) {
            const base64String = btoa(new Uint8Array(user.profilePicture.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')); 
            setProfileImage(base64String);
            setIsPFP(true);
        }
        else {
            setIsPFP(false)
        }

    }


    useEffect(() => {
        checkPFP()
    }, [profileImage], [isPFP]);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('author', user._id);
        data.append('name', user.name)
        data.append('username', user.username)
        data.append('caption', desc.current.value);


        if (image) {
            data.append('picture', image);
        }

        if (song) {

            data.append('song', selection.name);
            data.append('artist', selection.artist);
            data.append('image', selection.image);
            data.append('url', selection.url);
        }

        dispatch(createNewPost(data)).then((response) => {
            console.log(response.payload)
        });

       window.location.reload();
    };


    const getInfo = payload => {

        setSelection(payload)
        console.log(payload.url)
        setSong(true);
    }

    /*
    const handlePlaylist = async (e) => {
        dispatch(getUsersPlaylists()).then(() => {
            console.log("Success")
        })
    } *///

    return (
        <div className="PostShare">
            {isPFP ? <img src={`data:image/png;base64,${profileImage}`} alt="userPFP" /> : <img src={defaultPFP} alt="defaultPFP" />}

            <div>
                <div className="status">
                    <input type="text" placeholder="What's happening?" ref={desc} required />

                    <button className="status-button" onClick={handleUpload}>
                        Share
                    </button>
                </div>
                <div className="postOptions">
                    <div className="option"
                        style={{ color: "#CDBEE0" }}
                        onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option"
                        style={{ color: "#62929E" }} onClick={() =>
                            setModalOpened(true)
                        }>
                        <SpotifyPopUp modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                            getInfo={getInfo} />
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
                        <UilTimes onClick={() => {
                            setImage(null)
                            setIsPosted(null)
                        }} />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                )}

                {song && (<div className="previewImage">
                    <UilTimes onClick={() => {
                        setSong(null)
                        setIsPosted(null)
                    }} />
                    <SongCard
                        name={selection.name}
                        artist1={selection.artist}
                        image={selection.image}
                        url={selection.url}
                    ></SongCard>
                </div>)}
            </div>
        </div>
    )
}

export default PostShare