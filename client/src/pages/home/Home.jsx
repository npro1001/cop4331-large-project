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
import { useSelector} from 'react-redux'
import styled from "styled-components";
import { Modal } from '../../components/spotifyConnectModal/SpotifyModal' 
import  {toast} from 'react-toastify'


const Home = () => {
    const { isConnected, isError, message } = useSelector((store) => store.spotify)
    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //   setShowModal(prev => !prev);
    // };

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }
    }, [])
    

    return ( <div>
        {isConnected ? (
            <div className="Home">
                <div></div> 
                <div className='Top'>
                    <div className="navIcons">
                        <Link to='../Home'>
                            <UilHome className="home"></UilHome>
                        </Link>
                        <UilSetting className="setting" />
                        <img src={Logo} alt="Logo" />
                        <UilBell className="bell"></UilBell>
                        <UilMessage className="message"></UilMessage>
                    </div> 
                </div>
                <div></div>
                <div className='Bottom'>
                    <ProfileSide/>
                    <PostSide/>
                </div>
            </div>     
        // If NOT connected to spotify:
        ) : ( 
            <div className="modal-stretch">
                <Modal showModal={true} />
            </div>
        )}
    </div>
    )
}

export default Home