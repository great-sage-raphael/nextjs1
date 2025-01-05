
import { formatdate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'



const page = async({params}:{ params: Promise<{_id :string}> }) => {

  const md=markdownit();
  
    const id=(await params)._id
    const post =await client.fetch(STARTUP_BY_ID_QUERY,{id})
    const parsedcontent=md.render(post?.pitch || '')

   
    if(!post)return notFound()
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
    <p className='tag'>{formatdate(post?._createdAt)}</p>
    <h1 className='heading'>{post.title}</h1>
    <p className='sub-heading !max-w-5xl'>{post.description}</p>
    </section>
    <section className='section_container '>
      <img src={post.image} alt='thumbnail' className='w-full h-auto rounded-xl'></img>
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link 
            href={`/user/${post.author?._id}`}
            className='"flex gap-2 items-center mb-3'>

                <Image src={post.author.image}
                  alt='avatar'
                  width={64}
                  height={64}
                  className='rounded-full drop-shadow-lg'
                  />
                  <div>
                    <p className='text-20-medium'>{post.author.name}</p>
                    <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
                  </div>
            </Link>
            <p className='category-tag'>{post.category}</p>
          </div>
          <h3 className='text-30-bold'>pitch Details</h3> 
          <div>
            {parsedcontent ? (
              <article className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{__html:parsedcontent}}
              />
            ):<p className='no-result'>no details provided</p>}
          </div> 
      </div>
      <hr className='divider'/>
      {/* TODO: EDITOR SELECTED STARTUPS */}
      <Suspense fallback={<Skeleton className='view_skeleton'/>}>
        <View id={id}/>
      </Suspense>
    </section>
   

    </>
  )
}

export default page;