import {React, useEffect, useState } from "react";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import SongRecsCard from "../songRecsCard/SongRecsCard";
import './ProfileLeft.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const ProfileLeft = () => {
    const user = useSelector((state) => state.auth.user)
    const [activeUser, setActiveUser] = useState({})
    const params = useParams();
    const profileUsername = params.username;
    let profileUser;

    const fetchProfileUser = async () => {

        //if users profile
        if (profileUsername === user.username) {
            setActiveUser(user);
        }

        //logged in user is viewing someone else's page
        else {
            //get the persons profile and set them as the active user
            const res = await fetch(`/api/users/${profileUsername}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            })
            profileUser = await res.json();
            setActiveUser(profileUser);
        }
    }

    useEffect(() => {
        fetchProfileUser()
    },[user]);


    return (
        <div className="ProfileLeft">
            <LogoSearch/> 
            <InfoCard/>
            {(user.username !== activeUser.username)
                ? 
                ""
                : <SongRecsCard/>}
            
        </div>
    )
}

export default ProfileLeft