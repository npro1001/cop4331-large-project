import React from "react";
import PostContainer from "../PostContainer/PostContainer";
import PostShare from "../postShare/PostShare";
import './PostSide.css';
import LogoSearch from '../../components/logoSearch/LogoSearch'


const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare/>
            <PostContainer/>
        </div>
    )
}


export default PostSide