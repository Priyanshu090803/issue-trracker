'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className=' h-screen w-full flex justify-center'>  
        <div className=' border  h-fit py-10 px-24 shadow-xl rounded-2xl  shadow-neutral-300 flex  flex-col items-center gap-5'>        
            <input type="text" placeholder='Title' className=' px-4  py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg'/>
            <SimpleMDE  placeholder='Description' id=""    className=' px-4 w-full py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg'/>
            <Button className=' px-3 shadow-lg shadow-neutral-500 py-1 bg-neutral-800 hover:bg-black active:bg-black cursor-pointer'>Submit New Issue</Button>
        </div>

    </div>
  )
}

export default NewIssuePage