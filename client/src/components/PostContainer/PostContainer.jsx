import React from "react";
import './PostContainer.css'
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts } from "../../features/post/postSlice"
import { useEffect, useState } from "react"

const EmptyFeed = styled.h1`
    
    align-self: center;
    font-size: 20px;
    color: #391F59;
`
const AddOn = styled.h3`
    align-self: center;
    font-size: 15px;
    color: #391F59;
    bottom: 45px;
    position: relative;
`
const Posts = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    var [displayPosts, setDisplayPosts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function fetchData() {
        if (user.following.length != 0) {
            await dispatch(getPosts(user._id))
                .then(response => {
                    setDisplayPosts(response.payload)
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {

        fetchData();

    }, [], [displayPosts]); //! Important

    if (!isLoading) {
        //if there are no posts to display
        if (displayPosts.length == 0 || displayPosts == null) {
            return (
                <><EmptyFeed> No posts to display...</EmptyFeed><AddOn>Try posting something!</AddOn></>
            )
        }

        else {
            return (
                <div className="Posts">
                    {displayPosts.map((post, id) => {
                        return <div key={id}>
                            {post.img ? <Post data={post} img={post.img} /> : <Post data={post} />}
                        </div>
                    })}
                </div>
            )
        }
    }
}

export default Posts