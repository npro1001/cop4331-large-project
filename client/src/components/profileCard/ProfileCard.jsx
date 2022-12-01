import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import './ProfileCard.css'
import defaultCover from '../../img/default-cover-4.jpg'
import defaultPFP from '../../img/default-profile.png'
import styled from "styled-components";
import { getMe} from "../../features/auth/authSlice";
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

    const posts = useSelector((state) => state.post)
    // const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState({})
    const [following, setFollowing] = useState(false)
    const [followers, setFollowers] = useState()
    const [user, setUser] = useState()
    const [isFollowing, setIsFollowing] = useState();
    const [profileImage, setProfileImage] = useState();
    const [isPFP, setIsPFP] = useState();
    const [isCover, setIsCover] = useState();
    const [cover, setCover] = useState();
    const [name, setName] =useState();
    const [username, setUsername] =useState();
    const profileUsername = params.username;
    let profileUser;
    let loggedUser


    useEffect(() => {
        const fetchProfileUser = async () => {

            if (location === "homePage") {
                dispatch(getMe())
                    .then((response) => {
                        setUser(response.payload);
                        setName(response.payload.name)
                        setUsername(response.payload.username)
                        //noo one has a cover iamge rn
                        setIsCover(false);
                        if (user.profilePicture) {
                            const base64String = btoa(String.fromCharCode(...new Uint8Array(response.payload.profilePicture.data.data)));
                            setFollowing(response.payload.following.length);
                            setFollowers(response.payload.followers.length);
                            setProfileImage(base64String);
                           
                            setIsPFP(true);
                        }
                        else {
                            setIsPFP(false)
                        }
                    })
            }


            //on a profile page
            else {

                // get users info
                dispatch(getMe())
                    .then(async (response) => {
                        setUser(response.payload)
                        setIsCover(false);

                        if (profileUsername === response.payload.username) {

                            setActiveUser(response.payload);
                            setFollowing(response.payload.following.length);
                            setFollowers(response.payload.followers.length);
                            setName(response.payload.name)
                            setUsername(response.payload.username)
        
                            if (user.profilePicture) {
                                const base64String = btoa(String.fromCharCode(...new Uint8Array(user.profilePicture.data.data)));
                                setProfileImage(base64String);
                                setIsPFP(true);
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
        
                            const followingList = response.payload.following;
        
                            //check list to see if user is following the profile they are viewing
                            for (let i = 0; i < followingList.length; i++) {
                                if (followingList[i] == profileUser._id) {
                                    setIsFollowing(true);
                                }
                            }
                        }
                    })

                
            }
        }
        fetchProfileUser()
    }, [user], [profileImage], [cover], [activeUser], [isFollowing], [isPFP],[isCover]);



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
                {location=="profilePage "? isCover ? <img src={`data:image/png;base64,${cover}`} alt="userCover" /> : <img src={defaultCover} alt="defaultCover" /> : isCover? <img src={`data:image/png;base64,${cover}`} alt="Profile picture" />: <img src={defaultCover} alt="defaultCover" />}
                {location=="profilePage" ? isPFP ? <img src={`data:image/png;base64,${profileImage}`} alt="userPFP" /> :  <img src={defaultPFP} alt="defaultPFP" /> : isPFP? <img src={`data:image/png;base64,${profileImage}`} alt="userPFP" />:  <img src={defaultPFP} alt="defaultPFP" />}
   
            </div>

            <div className="ProfileName">
                {location === "homePage" ? <><span>{name}</span> <span>@{username}</span></> : <><span>{activeUser.name}</span> <span>@{activeUser.username}</span></>}

            </div>
            {location === "profilePage" && isFollowing
             && (username !== activeUser.username) 
             ?
                <Container>
                    <FollowButton onClick={DoUnFollow}>Unfollow</FollowButton>
                </Container> : ""}
            {(username !== activeUser.username)  &&location === "profilePage" && !isFollowing
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