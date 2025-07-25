import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Issues = () => {
  return (
    <div className=' p-4'>
      <Button className=' bg-blue-500 hover:bg-blue-700'><Link href={"/issues/new"}>New Issue</Link></Button>
    </div>  
  )
}

export default Issues