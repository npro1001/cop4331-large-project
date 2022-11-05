import React from 'react'
import Cover from '../../img/cover.webp'
import PFP from '../../img/pfp.jpg'
import './ProfileCard.css'

const ProfileCard = () => {

    const ProfilePage = true;
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Cover} alt=""/>
                <img src={PFP} alt=""/>
            </div>

            <div className="ProfileName">
                <span>Laura Johnson</span>
                <span>Indie Rock</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>50</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>468</span>
                        <span>Followers</span>
                    </div>

                    {ProfilePage && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>2</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>

            {ProfilePage? '': <span>
                My Profile
            </span>}
        </div>
    )
}

export default ProfileCard