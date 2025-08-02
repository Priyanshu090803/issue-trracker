// import React from 'react'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// const IssueFormSkeleton = () => {
//   return (
//       <div className=' h-screen w-full flex flex-col gap-4  items-center'>
//           <Skeleton width={"40rem"} height={40}/>
//           <Skeleton width={"40rem"} height={"30rem"}/>
//       </div>
//   )
// }

// export default IssueFormSkeleton


import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header skeleton */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Skeleton width={200} height={28} className="mb-2" />
          <Skeleton width={300} height={20} />
        </div>
        
        {/* Form content skeleton */}
        <div className="p-6 space-y-6">
          {/* Title field skeleton */}
          <div>
            <Skeleton width={80} height={20} className="mb-2" />
            <Skeleton height={40} className="w-full" />
          </div>
          
          {/* Description field skeleton */}
          <div>
            <Skeleton width={100} height={20} className="mb-2" />
            <Skeleton height={300} className="w-full" />
          </div>
          
          {/* Buttons skeleton */}
          <div className="flex justify-end space-x-3 pt-4">
            <Skeleton width={80} height={36} />
            <Skeleton width={120} height={36} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueFormSkeleton