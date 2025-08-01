import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const EditIssueLoading = () => {
  return (
    <div className=' h-screen w-full flex flex-col gap-4  items-center'>
        <Skeleton width={"40rem"} height={40}/>
        <Skeleton width={"40rem"} height={"30rem"}/>
    </div>
  )
}

export default EditIssueLoading