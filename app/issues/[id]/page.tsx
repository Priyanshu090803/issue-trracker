import prisma from '@/app/lib/prisma'
import StatusBadge from '@/components/StatusBadge'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaClockRotateLeft } from "react-icons/fa6";

interface Props {
    params:{id:string}
}

const IssueDetails = async ({params}:Props) => {
    // if(typeof params.id !== 'number') notFound()
    const findIssue = await prisma.issue.findUnique({
            where:{id:parseInt(params.id)}
    })
    if(!findIssue) notFound()

    return (
    <div className=' py-5 px-12 flex flex-col gap-4'>
        <h3 className=' text-3xl capitalize font-semibold text-neutral-800'>{findIssue.title}</h3>
        <div className=' flex gap-3 items-center'>
        <StatusBadge status={findIssue.status}/>
        <span className=' text-sm text-neutral-700 underline flex  gap-1 items-center'><FaClockRotateLeft className=' text-xs'/>{findIssue.createdAt.toDateString()}</span>
        </div>
       
        <p className=' border w-fit px-2 rounded-lg py-2'>{findIssue.description}</p>
    </div>
  )
}

export default IssueDetails