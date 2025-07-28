'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/api/issues/validationSchema';
import {z} from 'zod'

// interface IsssueForm{
//   title:string;
//   description:string
// }
   type IsssueForm= z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [error,setError] = useState(false)
  const router = useRouter()
  const {register,control,handleSubmit,formState:{errors}} = useForm<IsssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  return (
    <div className=' h-screen w-full flex justify-center'>  
          { error && <ToastContainer />}

        <div className=' border  h-fit py-10 px-24 shadow-xl rounded-2xl  shadow-neutral-300 flex  flex-col items-center gap-5'>    
          <form onSubmit={handleSubmit( async (data)=>{
           try {
             await axios.post("/api/issues",data)
             router.push("/issues")
             setError(false)
           } catch (error) {
             toast.error("An unexpected error occured!",{autoClose:3000,className:" bg-red-200 text-black"})
             setError(true)
            }
           })}>  
            <input type="text" placeholder='Title' className=' px-4  py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg' {...register("title")}/>
            {errors.title&&<p className=' text-red-500 text-xs my-3'>{errors.title.message}</p>}
          <Controller
          render={({field})=> <SimpleMDE  {...field} placeholder='Description'     className=' px-4 w-full py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg'/>}
          control={control}
          name='description'
          >
          </Controller>
            {errors.description&& <p className=' my-4 text-red-500 text-xs'>{errors.description.message}</p>}
           
            <Button className=' px-3 shadow-lg shadow-neutral-500 py-1 bg-neutral-800 hover:bg-black active:bg-black cursor-pointer'>Submit New Issue</Button>
            </form>  
        </div>

    </div>
  )
}

export default NewIssuePage