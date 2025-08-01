import prisma from '@/app/lib/prisma'
import StatusBadge from '@/components/StatusBadge'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaClockRotateLeft } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';
import delay from 'delay';
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';

interface Props {
    params:{id:string}
}

const IssueDetails = async ({params}:Props) => {
    await delay(1000)
    // if(typeof params.id !== 'number') notFound()
    const findIssue = await prisma.issue.findUnique({
            where:{id:parseInt(params.id)}
    })
    if(!findIssue) notFound()

    return (
    <div className=' py-5 px-12 flex flex-col gap-4'>
        <div className=' flex gap-10 items-center'>
         <h3 className=' text-3xl capitalize font-semibold text-neutral-800    '>{findIssue.title}</h3>
         <Link href={`/issues/${findIssue.id}/edit`} className=' bg-purple-600 px-3 py-1 rounded-md text-white flex cursor-pointer items-center gap-1'><FaEdit className=' text-sm'/>Edit</Link>
        </div>
       

        <div className=' flex gap-3 items-center'>
        <StatusBadge status={findIssue.status}/>
        <span className=' text-sm text-neutral-700 underline flex  gap-1 items-center'><FaClockRotateLeft className=' text-xs'/>{findIssue.createdAt.toDateString()}</span>
        </div>
        <div className='    border w-fit px-4 rounded-lg border-neutral-300 py-1'>
        <ReactMarkdown >{findIssue.description}</ReactMarkdown>
        </div>
    </div>
  )
}

export default IssueDetails