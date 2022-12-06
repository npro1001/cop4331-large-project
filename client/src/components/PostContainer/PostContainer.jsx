import React from "react";
import './PostContainer.css'
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts } from "../../features/post/postSlice"
import { useEffect, useState } from "react"
const asyncHandler = require('express-async-handler')

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
    var posts = []

    async function fetchData() {
        if (user.following.length != 0) {
            await dispatch(getPosts(user._id))
                .then(response => {
                    console.log(response.payload)
                    setDisplayPosts(response.payload)
                    setIsLoading(false)

                })
        }

    }

    useEffect(() => {

        fetchData();
        if (!isLoading) {
            console.log("done loading")
        }


    }, [], [displayPosts]); //! Important

    if (!isLoading) {
        //if there are no posts to display
        if (displayPosts.length < 1) {
            return (
                <><EmptyFeed> No posts to display...</EmptyFeed><AddOn>Try posting something!</AddOn></>
            )
        }

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

    else {

    }

}

export default Posts