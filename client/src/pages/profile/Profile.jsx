import React, { useEffect } from "react";
import ProfileLeft from '../../components/profileLeft/ProfileLeft';
import ProfileCard from '../../components/profileCard/ProfileCard';
import PostSide from '../../components/postSide/PostSide';
import RightSide from '../../components/rightSide/RightSide';
import './Profile.css'
import { Link } from "react-router-dom";
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import LogoSearch from '../../components/logoSearch/LogoSearch'
import Logo from '../../img/logo.png'
import {connect} from '../../features/spotify/spotifySlice'
import {useDispatch, useNavigate, useSelector} from 'react-redux'

const Profile = () => {

    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(connect)
    })

    return (
        <div className="Profile">
            <div className="Top">
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
            <div className="Bottom">
                <ProfileLeft/>
                <div className="Profile-center">
                    <ProfileCard location="profilePage" />
                    <PostSide/>
                </div>
            </div>

            {/* <RightSide/> */}
        </div>
    )
}

export default Profile