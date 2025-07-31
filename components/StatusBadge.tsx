import { Status } from '@/app/generated/prisma'
import React from 'react'


const StatusMap: Record<Status, { label: string; color: "red" | "purple" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  PROGRESS: { label: "In Progress", color: "purple" },
  CLOSED: { label: "Closed", color: "green"     }
};

const StatusBadge = ({status}:{status:Status}) => {
  return (
    <p style={{backgroundColor:StatusMap[status].color}} className=' text-neutral-50 w-fit rounded-md  px-2 py-1  text-xs font-medium uppercase'>
        {StatusMap[status].label}
    </p>
  )
}

export default StatusBadge