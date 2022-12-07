import { React, useEffect, useState } from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide'
import RightSide from '../../components/rightSide/RightSide'
import { Link } from "react-router-dom";
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import LogoSearch from '../../components/logoSearch/LogoSearch'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector} from 'react-redux'
import styled from "styled-components";
import { Modal } from '../../components/spotifyConnectModal/SpotifyModal' 
import  {toast} from 'react-toastify'
import { connect } from '../../features/spotify/spotifySlice'
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { isConnected, isError, message } = useSelector((store) => store.spotify)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get("access_token")
        if(!isConnected && token != null) {
            dispatch(connect())
            .then(() => {
                window.location.hash = "";
            })
        }
    }, [])

    const getTokenFromUrl = () => {
        return window.location.hash
          .substring(1)
          .split("&")
          .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
          }, {});
      };
    

    return ( <div>
        {isConnected ? (
            <div className="Home">
                <div className='Top'>
                    <div className="navIcons">
                        <Link to='/home'>
                            <UilHome className="home" ></UilHome> 
                        </Link>
                        <div className="inactive">
                            <UilSetting className="setting" />
                        </div>
                        <img src={Logo} alt="Logo" />
                        <div className="inactive">
                            <UilBell className="bell"></UilBell>
                            <UilMessage className="message"></UilMessage>
                        </div>
                    </div> 
                </div>
                <div className='Bottom'>
                    <ProfileSide/>
                    <PostSide/>
                </div>
            </div>     
        // If NOT connected to spotify:
        ) : ( 
            <div className="modal-stretch">
                <Modal/>
            </div>
        )}
    </div>
    )
}

export default Home