import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../contexts/UserContext';

export const PostPage = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [post,setPost] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`,{
      credentials:'include'
    }).then(res => res.json()).then(res => setPost(res));
  },[id]);
  if(!post) return '';
  return (
    <div className='post-page'>
        <div className='post-page-header'>
          <div className='text'>
            <h2 className="title">{post.title}</h2>
            <div>
              <time className="time">{formatISO9075(new Date(post.createdAt))}</time>
              <div style={{marginTop:'10px'}}>
                <span>Posted by</span>
                <span className='author'>{` @${post.author.username}`}</span>
              </div>
            </div>
          </div>
          {userInfo.id === post.author._id && (
            <button style={{margin: "10px 0"}}><Link to={`/edit/${id}`} style={{textDecoration:'none'}}>Edit Post</Link></button>
          )}
        </div>
        <div className='image'>
            <img src={"http://localhost:5000/"+post.cover} alt="400"/>
          </div>
        <div className='content' dangerouslySetInnerHTML={{__html:post.content}} />
    </div>
  )
}
