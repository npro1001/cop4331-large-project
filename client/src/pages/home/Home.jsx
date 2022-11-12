import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide'
import RightSide from '../../components/rightSide/RightSide'
import { Link } from "react-router-dom";
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import LogoSearch from '../../components/logoSearch/LogoSearch'


const Home = () => {
    return (
        <div className="Home">
            <div className='Top'>
                
                <div className="navIcons">
                    <Link to='../Home'>
                        <UilHome className="home"></UilHome>
                    </Link>
                    <UilSetting className="setting" />
                    <UilBell className="bell"></UilBell>
                    <UilMessage className="message"></UilMessage>
                </div> 
                <LogoSearch/>
                
            </div>
            <div className='Bottom'>
                <ProfileSide/>
                <PostSide/>
            </div>

            {/* <RightSide/> */}
        </div>

    )
}

export default Home