'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const DeleteBtn = ({issueId}:{issueId:number}) => {
  const router = useRouter()
  return (
  <Dialog>
  <DialogTrigger className=' bg-red-500 flex items-center gap-1  rounded-lg px-2 py-2 font-medium text-white cursor-pointer'><MdDelete/>Delete
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className=' font-bold text-xl'>Confirm Deletion!</DialogTitle>
      <DialogDescription className=' text-lg  '>
       Are you sure to delete this issue? This action cannot be undo.
      </DialogDescription>
    </DialogHeader>
    <div className=' flex md:justify-start justify-center  items-center gap-4'>
    {/* <button className=' bg-gray-200  rounded-lg px-2 py-1 cursor-pointer font-medium'>Cancel</button> */}
    <button
    onClick={()=>{
      axios.delete('/api/issues/'+issueId)
      router.push("/issues")
      router.refresh()
    }
    }
    className=' bg-red-500 text-white rounded-lg px-2 py-1 cursor-pointer font-medium'>Delete</button>
    </div>
  
  </DialogContent>
</Dialog>

  )
}

export default DeleteBtn