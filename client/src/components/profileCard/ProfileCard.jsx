import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import './ProfileCard.css'
// import { follow, reset } from '../../features/interactions/intSlice'; Celina Fix This
import defaultCover from '../../img/default-cover-4.jpg'
import defaultPFP from '../../img/default-profile.png'
import { useReducedMotion } from 'framer-motion'
import styled from "styled-components";
import { useWindowScroll } from "@mantine/hooks";

const Container = styled.div`
    position: relative;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 40px;
    padding:auto;
    display:flex;
`


const FollowButton = styled.button`
    width: 50%;
    height: 100%;
    font-size: 20px;
    position: relative;
    color: white;
    border: none;
    background: #CDBEE0;
    border-radius: 15px;
    cursor: pointer;
    background: var(--purple);
    text-shadow: 0 0 2px #999;
    align-self: center;
    transition: all, 240ms ease-in-out;

    &:hover {
    background: rgba(93, 48, 149, 1);
    filter: brightness(1.2);
}
`



const ProfileCard = ({ location }) => {


    let isOwnProfile = true;
    const posts = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useState({})
    const [following, setFollowing] = useState(false)
    const [followers, setFollowers] = useState()
    const [isFollowing, setIsFollowing] = useState();
    const profileUsername = params.username;
    let profileUser;
    let loggedUser


    useEffect(() => {
        const fetchProfileUser = async () => {

            if (location === "homePage") {
                const res = await fetch(`/api/users/${user.username}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                loggedUser = await res.json();
                setActiveUser(loggedUser);
                setFollowing(loggedUser.following.length);
                setFollowers(loggedUser.followers.length);

            }


            //on a profile page
            else if (location === "profilePage") {

                //check if its the logged in user's profile page
                if (profileUsername === user.username) {
                    const res = await fetch(`/api/users/${user.username}`, {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' },
                    })
                    loggedUser = await res.json();
                    setActiveUser(loggedUser);
                    setFollowing(loggedUser.following.length);
                    setFollowers(loggedUser.followers.length);
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
                    setFollowing(profileUser.following.length);
                    setFollowers(profileUser.followers.length);

                    //get logged in user's info to check if the user is following them
                    const loggedRes = await fetch(`/api/users/${user.username}`, {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' },
                    })
                    loggedUser = await loggedRes.json()
                    const followingList = loggedUser.following;

                    //check list to see if user is following the profile they are viewing
                    for (let i = 0; i < followingList.length; i++) {
                        if (followingList[i] == profileUser._id) {
                            setIsFollowing(true);
                        }
                    }
                }
            }
        }
        fetchProfileUser()
    }, [user]);



    const DoFollow = async () => {
        await fetch(`/api/users/${activeUser._id}/follow`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": "100"
            },
            body: JSON.stringify({ "currentUserId": user._id })
        })
        window.location.reload();
    }

    const DoUnFollow = async () => {
        await fetch(`/api/users/${activeUser._id}/unfollow`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": "100"
            },
            body: JSON.stringify({ "currentUserId": user._id })
        })
        window.location.reload();
    }


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
            {location === "profilePage" && isFollowing && (activeUser.username != user.username) ?
                <Container>
                    <FollowButton onClick={DoUnFollow}>Unfollow</FollowButton>
                </Container> : ""}
            {location === "profilePage" && !isFollowing && (activeUser.username != user.username) ? <Container>
                <FollowButton onClick={DoFollow}>Follow</FollowButton>
            </Container> : ""}


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