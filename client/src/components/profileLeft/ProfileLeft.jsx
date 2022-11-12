import React from "react";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import SongRecsCard from "../songRecsCard/SongRecsCard";
import './ProfileLeft.css'
import { Link } from "react-router-dom";
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'

const ProfileLeft = () => {
    return (
        <div className="ProfileLeft">
                        {/* <div className="navIcons">
                <Link to='../Home'>
                    <UilHome className="home"></UilHome>
                </Link>
                <UilSetting className="setting" />
                <UilBell className="bell"></UilBell>
                <UilMessage className="message"></UilMessage>
            </div> 
            <LogoSearch/> */}
            <InfoCard/>
            <SongRecsCard/>
        </div>
    )
}

export default ProfileLeft