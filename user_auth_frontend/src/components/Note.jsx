import React from 'react'

const Note = ({ note, onDelete }) => {
    
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')
  return (
      <div className='p-[10px] my-[20px] mx-0 border border-[#ccc] rounded-md'>
          <p className='text-[#666] pb-4'>Title: {note.title}</p>
          <p className='text-[#666] pb-4'>Content: {note.content}</p>
          <p className='text-[#999] text-[0.8rem] pb-4'>{formattedDate }</p>
          <button className=' bg-[#f44336] hover:bg-[#d32f2f] text-white border-none py-[10px] px-[20px] rounded-xl cursor-pointer transition-all duration-300' onClick={()=>onDelete(note.id)}>Delete</button>
    </div>
  )
}

export default Note