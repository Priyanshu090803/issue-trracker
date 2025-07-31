import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailsLoading = () => {
  return (
  <div className=' py-5 px-12 flex flex-col gap-4'>
        <div className=' flex flex-col gap-3 w-xl  '>
        <Skeleton height={50} width={90} />
        <span className=' text-sm text-neutral-700 underline flex  gap-1 items-center w-xl'><Skeleton width={70} height={30}/></span>
        </div>
        <div className='     border w-2xl px-4 rounded-lg border-neutral-300 py-1'>
        <Skeleton/>
        </div>
    </div>
  )
}

export default IssueDetailsLoading