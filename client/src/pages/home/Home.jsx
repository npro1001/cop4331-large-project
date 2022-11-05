import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide'
import RightSide from '../../components/rightSide/RightSide'

const Home = () => {
    return (
        <div className="Home">
            <ProfileSide/>
            <PostSide/>
            <RightSide/>
        </div>

    )
}

export default Home