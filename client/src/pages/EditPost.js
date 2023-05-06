import React, { useEffect, useState } from 'react'
import { Editor } from '../components/Editor'
import { Navigate, useParams } from 'react-router-dom';

export const EditPost = () => {
  const { id } = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [files,setFiles] = useState('');
  const [content,setContent] = useState('');
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`,{
      credentials:'include'
    }).then(res => res.json()).then(res =>{
      setTitle(res.title);
      setSummary(res.summary);
      setContent(res.content);
    });
  },[id]);
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('id',id);
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(`http://localhost:5000/post`,{
      method:'PUT',
      credentials: 'include',
      body: data
    });
    if(response.ok) setRedirect(true);
  }
  if(redirect){
    return <Navigate to={'/post/'+id} />
  }
  return (
    <form className='create-post' onSubmit={handleOnSubmit}>
        <input type="text" placeholder='title' className='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input type="text" placeholder='summary' className='summary' value={summary} onChange={(e) => setSummary(e.target.value)}></input>
        <input type="file" placeholder='file' onChange={(e) => setFiles(e.target.files)}></input>
        <Editor value={content} onChange={setContent} />
        <button type="submit">Update Post</button>
    </form>
  )
}
