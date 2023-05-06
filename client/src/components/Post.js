import React from 'react'
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';

export const Post = ({_id,title,summary,content,cover,author,createdAt}) => {
  return (
    <div className="post">
        <div>
          <Link to={`/post/${_id}`}>
            <img src={"http://localhost:5000/"+cover} alt="400"/>
          </Link>
        </div>
       
        <div className='text'>
          <Link to={`/post/${_id}`} style={{textDecoration:'none'}}>
            <h2 className="title">{title}</h2>
          </Link>
          <div className='postInfo'>
            <div style={{display:'flex',gap:'5px'}}>
              <p>Posted by</p>
              <p className='author'>{` @${author.username}`}</p>
            </div>
            <time className="time">{formatISO9075(new Date(createdAt))}</time>
          </div>
          <div className='summary'>
              {summary}
          </div>
        </div>
    </div>
  )
}
