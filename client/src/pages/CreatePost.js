import React, { useState } from 'react'
import { Editor } from '../components/Editor'
import { Navigate } from 'react-router-dom';

export const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [files,setFiles] = useState('');
  const [content,setContent] = useState('');
  const [redirect,setRedirect] = useState(false);
  const handleOnSubmit = async(e) => {
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    e.preventDefault();
    const response = await fetch('http://localhost:5000/post',{
      method:'POST',
      credentials: 'include',
      body: data
    });
    if(response.ok) setRedirect(true);
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <form className='create-post' onSubmit={handleOnSubmit}>
        <input type="text" placeholder='title' className='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input type="text" placeholder='summary' className='summary' value={summary} onChange={(e) => setSummary(e.target.value)}></input>
        <input type="file" placeholder='file' onChange={(e) => setFiles(e.target.files)}></input>
        <Editor value={content} onChange={setContent} />
        <button type="submit">CreatePost</button>
    </form>
  )
}
