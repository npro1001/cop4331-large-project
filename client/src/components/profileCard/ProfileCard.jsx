import { useReducedMotion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import './ProfileCard.css'
import defaultCover from '../../img/default-cover-4.jpg'
import defaultPFP from '../../img/default-profile.png'
import {useNavigate} from "react-router-dom";

const ProfileCard = ({location}) => {

    const navigate = useNavigate();
    const posts = useSelector((state)=>state.post)
    const {user} = useSelector((state) => state.auth);
    console.log(posts.PostData)
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
                <span>{user.name}</span>
                <span>@{user.username}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.PostData.filter((post)=>post.id === user._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === 'profilePage'? "":<span
            onClick={() => {
                navigate(
                    `/Profile/${user._id}`);
            }}>My Profile</span>}
        </div>
    )
}

export default ProfileCard