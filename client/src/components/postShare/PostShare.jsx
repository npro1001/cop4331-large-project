import React, {useState, useRef} from "react";
import PFP from '../../img/pfp.jpg'
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilMusic } from '@iconscout/react-unicons'
import { UilListUl } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'

const PostShare = () => {
    const[image, setImage] = useState(null)
    const imageRef = useRef();

    const onImageChange =(event)=> {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                image: URL.createObjectURL(img)
            });
        }
    };

    return (
        <div className="PostShare">
            <img src={PFP} alt="" />
            <div>
            <input type="text" placeholder="What's happening?"/>
                <div className="postOptions">
                    <div className="option"
                    style={{color: "#CDBEE0"}}
                    onClick={()=>imageRef.current.click()}
                    >
                        <UilScenery/>
                        Photo
                    </div>
                    <div className="option"
                    style={{color: "#62929E"}}
                    >
                        <UilMusic/>
                        Song
                    </div>
                    <div className="option"
                    style={{color: "#B2675E"}}
                    >
                        <UilListUl/>
                        Playlist
                    </div>
                    <button className="button ps-button">
                        Share
                    </button>
                    <div style={{display: "none"}}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={()=>setImage(null)} />
                        <img src={image.image} alt="" />
                    </div>
                )}

            </div>
        </div>
    )
}

export default PostShare