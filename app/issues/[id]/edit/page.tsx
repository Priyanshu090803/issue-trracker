// 'use client'
import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'
// import IssueForm from '../../_components/IssueForm'

const IssueForm = dynamic(()=>import("@/app/issues/_components/IssueForm")
,{
  // ssr:false,
  loading:()=><IssueFormSkeleton/>
}
)

interface Props{
    params:{id:string}
}

const EditIssue = async ({params}:Props) => {
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue) notFound()
  return (
    <IssueForm issue={issue}/>        
  )
}

export default EditIssue