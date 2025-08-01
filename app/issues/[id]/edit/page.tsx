import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import IssueForm from '../../_components/IssueForm'

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