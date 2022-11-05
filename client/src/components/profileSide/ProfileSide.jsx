import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import SongRecsCard from '../songRecsCard/SongRecsCard'
import "./ProfileSide.css"

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch/>
            <ProfileCard/>
            <SongRecsCard/>
        </div>
    )
}

export default ProfileSide