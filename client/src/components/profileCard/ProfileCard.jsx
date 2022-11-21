import { useReducedMotion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import './ProfileCard.css'
import defaultCover from '../../img/default-cover-4.jpg'
import defaultPFP from '../../img/default-profile.png'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react'

const ProfileCard = ({ location }) => {


    const posts = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useState({})
    const [following, setFollowing] = useState()
    const [followers, setFollowers] = useState()
    const profileUsername = params.username;
    let profileUser;

    useEffect(() => {
        const fetchProfileUser = async () => {

            if (location === "homePage") {
                setActiveUser(user);
                setFollowing(user.following.length);
                setFollowers(user.followers.length);
            }

            else if (location === "profilePage") {
                if (profileUsername === user.profileUsername) {
                    setActiveUser(user);
                    setFollowing(user.following.length);
                    setFollowers(user.followers.length);
                }

                else {
                    const res = await fetch(`/api/users/${profileUsername}`, {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' },
                    })
                    profileUser = await res.json();
                    setActiveUser(profileUser);
                    setFollowing(profileUser.following.length);
                    setFollowers(profileUser.followers.length);
                }
            }
        }
        fetchProfileUser()
    }, [user]);
    return (

        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={
                    user.coverPicture
                        ? user.coverPicture
                        : defaultCover
                } alt="Cover image" />
                <img src={user.PFP
                    ? user.PFP
                    : defaultPFP} alt="Profile picture" />
            </div>

            <div className="ProfileName">
                {location === "homePage" ? <><span>{user.name}</span> <span>@{user.username}</span></> : <><span>{activeUser.name}</span> <span>@{activeUser.username}</span></>}

            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{followers}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{following}</span>
                        <span>Following</span>
                    </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.PostData.filter((post) => post.id === activeUser._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === 'profilePage' ? "" : <span
                onClick={() => {
                    navigate(
                        `/profile/${user.username}`);
                }}>My Profile</span>}
        </div>
    )
}

export default ProfileCard