import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import SongRecsCard from '../songRecsCard/SongRecsCard'
import "./ProfileSide.css"
import { Link } from "react-router-dom";
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            {/* <div className="navIcons">
                <Link to='../Home'>
                    <UilHome className="home"></UilHome>
                </Link>
                <UilSetting className="setting" />
                <UilBell className="bell"></UilBell>
                <UilMessage className="message"></UilMessage>
            </div> */}
            <LogoSearch/>
            <ProfileCard location="homePage"/>
            <SongRecsCard/>
        </div>
    )
}

export default ProfileSide