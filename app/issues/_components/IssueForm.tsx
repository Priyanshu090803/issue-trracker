// import SimpleMDE from "react-simplemde-editor";
  // interface IsssueForm{
  //   title:string;
  //   description:string
  // }                            earlier code
  'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/api/issues/validationSchema';
import { z } from 'zod'
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { Issue } from '@/app/generated/prisma';
import dynamic from 'next/dynamic';
    const SimpleMDE =  dynamic(()=>import('react-simplemde-editor'),{ssr:false})

type IssueForm = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
    mode: 'onChange'
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data)
        toast.success("Issue updated successfully!", {
          autoClose: 2000,
          className: "bg-green-100 text-green-800"
        })
      } else {
        await axios.post("/api/issues", data)
        toast.success("Issue created successfully!", {
          autoClose: 2000,
          className: "bg-green-100 text-green-800"
        })
      }
      setTimeout(() => router.push("/issues"), 2200)
      setError(false)
    } catch (error) {
      setSubmitting(false)
      toast.error("An unexpected error occurred!", {
        autoClose: 3000,
        className: "bg-red-100 text-red-800"
      })
      setError(true)
    }
  })

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <ToastContainer position="top-center" />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {issue ? 'Edit Issue' : 'Create New Issue'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {issue ? 'Update the issue details below' : 'Fill in the details to create a new issue'}
          </p>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id="title"
              defaultValue={issue?.title}
              type="text"
              placeholder="Enter issue title"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register("title")}
            />
            {errors.title && (
              <ErrorMessage  >{errors.title.message}</ErrorMessage>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <Controller
              control={control}
              name="description"
              defaultValue={issue?.description}
              render={({ field }) => (
                <SimpleMDE
                  id="description"
                  {...field}
                  placeholder="Describe the issue in detail..."
                  className={`prose max-w-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  options={{
                    autofocus: true,
                    spellChecker: false,
                    placeholder: "Describe the issue in detail...",
                    status: false,
                    toolbar: [
                      'bold', 'italic', 'heading', '|',
                      'quote', 'unordered-list', 'ordered-list', '|',
                      'link', 'image', '|',
                      'preview', 'side-by-side', 'fullscreen', '|',
                      'guide'
                    ]
                  }}
                />
              )}
            />
            {errors.description && (
              <ErrorMessage  >{errors.description.message}</ErrorMessage>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || !isValid}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
                submitting || !isValid 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader />
                  {issue ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                issue ? 'Update Issue' : 'Create Issue'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueForm