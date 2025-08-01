'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
// import SimpleMDE from "react-simplemde-editor";
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import {zodResolver} from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/api/issues/validationSchema';
import {z} from 'zod'
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { Issue } from '@/app/generated/prisma';


const SimpleMDE =  dynamic(()=>import('react-simplemde-editor'),{ssr:false})
// interface IsssueForm{
//   title:string;
//   description:string
// }
  type IsssueForm= z.infer<typeof issueSchema>
 
const IssueForm = ({issue}:{issue?:Issue}) => {
  const [error,setError] = useState(false)
  const [submitting,setSubmitting] = useState(false)
  const router = useRouter()
  const {register,control,handleSubmit,formState:{errors}} = useForm<IsssueForm>({
    resolver: zodResolver(issueSchema)
  })
  const submit=handleSubmit( async (data)=>{
           try {
             setSubmitting(true)
             if(issue) {
              await axios.patch("/api/issues/"+issue.id,data)
             }
             else{
             await axios.post("/api/issues",data)
             }
             router.push("/issues")
             setError(false)
           } catch (error) {
            setSubmitting(false)
             toast.error("An unexpected error occured!",{autoClose:3000,className:" bg-red-200 text-black"})
             setError(true)
            }
           })
  return (
    <div className=' h-screen w-full flex justify-center'>  
          { error && <ToastContainer />}

        <div className=' border  h-fit py-10 px-24 shadow-xl rounded-2xl  shadow-neutral-300 flex  flex-col items-center gap-5'>    
          <form onSubmit={submit}>  
            <input 
            defaultValue={issue?.title}
            type="text" placeholder='Title' className=' px-4  py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg' {...register("title")}/>
            {errors.title&&<ErrorMessage>{errors.title?.message}</ErrorMessage>}
            
          <Controller
          control={control}
          name='description'
          defaultValue={issue?.description}
          render={({field})=> <SimpleMDE  {...field} placeholder='Description'   
            className=' px-4 w-full py-2 border border-neutral-300 text-neutral-700 text-sm focus:outline-1 focus: outline-gray-400 rounded-lg'/>}
       
          >
          </Controller>
            {errors.description&& <ErrorMessage>{errors.description?.message}</ErrorMessage>}
           
            <Button 
            disabled={submitting}
            className=' px-3 shadow-lg shadow-neutral-500 py-1 bg-neutral-800 hover:bg-black active:bg-black cursor-pointer'>{issue?'Edit Issue':'Submit New Issue'} {' '} {submitting&&<Loader/>}</Button>
            </form>  
        </div>

    </div>
  )
}

export default IssueForm