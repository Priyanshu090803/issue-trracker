 

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import prisma from '../lib/prisma'
import StatusBadge from '@/components/StatusBadge'
import delay from 'delay'

const Issues = async() => {
  const issueData = await prisma.issue.findMany()
  await delay(2000)
  return (
    <div className='min-h-screen   p-4 md:p-6 lg:p-8'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Issues</h1>
            <p className='text-gray-600'>Manage and track all your project issues</p>
          </div>
          <Button className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
            <Link href="/issues/new" className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
              New Issue
            </Link>
          </Button>
        </div>

        {/* Issues Container */}
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
          {/* Desktop Header */}
          <div className='hidden md:grid md:grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
            <div className='px-6 py-4 font-semibold text-gray-800 text-left border-r border-gray-200'>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
                Issue Title
              </div>
            </div>
            <div className='px-6 py-4 font-semibold text-gray-800 text-left border-r border-gray-200'>
              <div className='flex items-center gap-2'>
                {/* <svg className='w-5 h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h7' />
                </svg> */}
                Status
              </div>
            </div>
            <div className='px-6 py-4 font-semibold text-gray-800 text-left'>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v2a1 1 0 01-1 1h-.586l-.707.707A1 1 0 0117 13H7a1 1 0 01-.707-.293L5.586 12H5a1 1 0 01-1-1v-2a1 1 0 011-1h3z' />
                </svg>
                Created At
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className='divide-y divide-gray-100'>
            {issueData.length === 0 ? (
              <div className='text-center py-16 px-6'>
                <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                  <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>No issues found</h3>
                <p className='text-gray-500 mb-6'>Get started by creating your first issue</p>
                <Button className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'>
                  <Link href="/issues/new">Create First Issue</Link>
                </Button>
              </div>
            ) : (
              issueData.map((item, index) => (
                <div key={item.id} className='hover:bg-gray-50 transition-colors duration-150'>
                  {/* Desktop Layout */}
                  <div className='hidden md:grid md:grid-cols-3 items-center'>
                    <Link href={`/issues/${item.id}`} className='px-6 py-4 border-r border-gray-100'>
                      <h3 className='font-medium text-neutral-900 capitalize hover:underline hover:text-blue-500 truncate text-left line-clamp-1 scale-100 hover:scale-101 will-change-transform duration-150 delay-75 ease-out active:underline active:text-blue-500'>{item.title}</h3>
                    </Link>
                    <div className='px-6 py-4 border-r border-gray-100'>
                      <StatusBadge status={item.status}/> 
                    </div>
                    <div className='px-6 py-4'>
                      <div className='flex items-center gap-2 text-left'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          {item.createdAt.toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className='md:hidden p-6 space-y-4'>
                    <div className='flex items-start justify-between'>
                      <h3 className='font-semibold text-gray-900 text-lg flex-1 mr-4 line-clamp-1'>{item.title}</h3>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap'>
                        {item.createdAt.toDateString()}
                      </span>
                    </div>
                      <StatusBadge status={item.status}/> 
                    <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
                      {/* <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        Issue #{index + 1}
                      </div> */}
                      {/* <Button variant='ghost' size='sm' className='text-blue-600 hover:text-blue-700 hover:bg-blue-50'>
                        View Details
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Footer */}
        {issueData.length > 0 && (
          <div className='mt-6 bg-white rounded-xl shadow-md border border-gray-100 p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div className='flex items-center gap-6'>
                <div className='text-center sm:text-left'>
                  <p className='text-2xl font-bold text-gray-900'>{issueData.length}</p>
                  <p className='text-sm text-gray-500'>Total Issues</p>
                </div>
                <div className='hidden sm:block w-px h-12 bg-gray-200'></div>
                <div className='text-center sm:text-left'>
                  <p className='text-2xl font-bold text-blue-600'>{issueData.length}</p>
                  <p className='text-sm text-gray-500'>Active Issues</p>
                </div>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Issues