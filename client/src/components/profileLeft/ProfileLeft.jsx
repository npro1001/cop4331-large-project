import React from "react";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import SongRecsCard from "../songRecsCard/SongRecsCard";
import './ProfileLeft.css'

const ProfileLeft = () => {
    return (
        <div className="ProfileLeft">
            <LogoSearch/> 
            <InfoCard/>
            <SongRecsCard/>
        </div>
    )
}

export default ProfileLeft