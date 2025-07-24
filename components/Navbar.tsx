import Link from 'next/link'
import { GiVelociraptorTracks } from 'react-icons/gi'

const Navbar = () => {
    const links =[
        {label:"Dashboard",href:"/"},
        {label:"Issues",href:"/issues"}
    ]
  return (
    <div className=' h-14 flex items-center px-8 w-full border-b-2 border-b-neutral-300  mb-6 justify-between'>
        <Link href={'/'}><GiVelociraptorTracks height={20} width={20} className=' text-3xl'/></Link>
        <ul className=' flex gap-10'>
            {
                links.map((item)=><Link
                className=' text-neutral-600 hover:text-neutral-900 transition-colors'
                href={`${item.href}`} key={item.label}>{item.label}</Link>)
            }
        </ul>
    </div>
  )
}

export default Navbar