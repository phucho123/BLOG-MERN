import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({value, onChange}) => {
const modules = {
    toolbar: [
        [{ header: [1, 2,3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            {align: 'center'}
        ],
        ['link', 'image'],
        ['clean'],
    ],
};
  return (
    <ReactQuill className="editor" theme="snow" modules={modules} value={value} onChange={onChange} />
  )
}
