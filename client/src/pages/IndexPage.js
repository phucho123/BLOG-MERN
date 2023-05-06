import React, { useEffect, useState } from 'react'
import { Post } from '../components/Post';

export const IndexPage = () => {
    const [posts,setPosts] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:5000/post',{
            credentials: 'include',
        }).then(res => res.json()).then(res =>{
            setPosts(res);
        });
    },[]);
  return (
    <div>
        {posts.length > 0 && posts.map((post) => (
            <Post {...post} />
        ))}
    </div>
  )
}
