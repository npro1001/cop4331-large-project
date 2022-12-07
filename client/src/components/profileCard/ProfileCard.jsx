import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import './ProfileCard.css'
import defaultCover from '../../img/default-cover-4.jpg'
import defaultPFP from '../../img/default-profile.png'
import styled from "styled-components";
import { followUser, unfollowUser} from "../../features/auth/authSlice";

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
    width: 40%;
    height: 100%;
    font-size: 15px;
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

    const user = useSelector((state) => state.auth.user)
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState({})
    const [following, setFollowing] = useState()
    const [followers, setFollowers] = useState()
    const [isFollowing, setIsFollowing] = useState();
    const [profileImage, setProfileImage] = useState();
    const [numPosts, setNumPosts] = useState();
    const [isPFP, setIsPFP] = useState();
    const [isCover, setIsCover] = useState();
    const [cover, setCover] = useState();
    const profileUsername = params.username;
    let profileUser;


    const fetchProfileUser = async () => {

        if (location === "homePage") {

            setIsCover(false);

            setFollowing(user.following.length);
            setFollowers(user.followers.length);


            if (user.profilePicture) {

                if (user.profilePicture.data) {
                    const base64String = btoa(new Uint8Array(user.profilePicture.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));

                    setProfileImage(base64String);
                    setIsPFP(true);
                }

                else {
                    setIsPFP(false);
                }

            }
            else {
                setIsPFP(false)
            }
        }


        //on a profile page
        else {

            //if users profile
            if (profileUsername === user.username) {

                setActiveUser(user);
                setFollowing(user.following.length);
                setFollowers(user.followers.length);
                setNumPosts(user.posts.length)

                if (user.profilePicture) {

                    if (user.profilePicture.data) {
                        const base64String = btoa(new Uint8Array(user.profilePicture.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                        }, ''));

                        setProfileImage(base64String);
                        setIsPFP(true);
                    }

                    else {
                        setIsPFP(false);
                    }

                }
                else {
                    setIsPFP(false)
                }

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
                if (profileUser.posts) {
                    setNumPosts(profileUser.posts.length)
                }

                if (profileUser.profilePicture) {

                    if (profileUser.profilePicture.data) {
                        const base64String = btoa(new Uint8Array(profileUser.profilePicture.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                        }, ''));

                        setProfileImage(base64String);
                        setIsPFP(true);
                    }

                    else {
                        setIsPFP(false);
                    }

                }
                else {
                    setIsPFP(false)
                }


                let length = profileUser.followers.length

                //check list to see if user is following the profile they are viewing
                for (let i = 0; i < length; i++) {

                    if (profileUser.followers[i] == user._id) {
                        setIsFollowing(true);
                    }
                }
            }
        }
    }
    useEffect(() => {
        fetchProfileUser()
    }, [profileImage], [cover], [activeUser], [isFollowing], [isPFP], [isCover], [user]);



    const DoFollow = async () => {
        await dispatch(followUser(activeUser._id)).then((response) => {
            console.log(response);
        }) 

        window.location.reload();
    }

    const DoUnFollow = async () => {

        await dispatch(unfollowUser(activeUser._id)).then((response) => {
            console.log(response);
        }) 

        window.location.reload();
    }

    return (

        <div className="ProfileCard">
            <div className="ProfileImages">
                {location == "profilePage " ? isCover ? <img src={`data:image/png;base64,${cover}`} alt="userCover" /> : <img src={defaultCover} alt="defaultCover" /> : isCover ? <img src={`data:image/png;base64,${cover}`} alt="Profile picture" /> : <img src={defaultCover} alt="defaultCover" />}
                {location == "profilePage" ? isPFP ? <img src={`data:image/;base64,${profileImage}`} alt="userPFP" /> : <img src={defaultPFP} alt="defaultPFP" /> : isPFP ? <img src={`data:image/png;base64,${profileImage}`} alt="userPFP" /> : <img src={defaultPFP} alt="defaultPFP" />}

            </div>

            <div className="ProfileName">
                {location === "homePage" ? <><span>{user.name}</span> <span>@{user.username}</span></> : <><span>{activeUser.name}</span> <span>@{activeUser.username}</span></>}

            </div>
            {location === "profilePage" && isFollowing
                && (user.username !== activeUser.username)
                ?
                <Container>
                    <FollowButton onClick={DoUnFollow}>Unfollow</FollowButton>
                </Container> : ""}
            {(user.username !== activeUser.username) && location === "profilePage" && !isFollowing
                ? <Container>
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
                                {numPosts ? <span>{numPosts}</span> : <span>0</span>}
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