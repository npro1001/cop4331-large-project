import React from "react";
import ProfileLeft from "../../../components/profileLeft/ProfileLeft.jsx";
import ProfileCard from '../../../components/profileCard/ProfileCard.jsx';
import PostSide from '../../../components/postSide/PostSide.jsx';
import RightSide from '../../../components/rightSide/RightSide.jsx';
import './Profile.css'

const Profile = () => {
    return (
        <div className="Profile">
            <ProfileLeft/>

            <div className="Profile-center">
                <ProfileCard/>
                <PostSide/>
            </div>

            <RightSide/>
        </div>
    )
}

export default Profile