import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { VIEWS_BY_ID } from '@/sanity/lib/queries'
import { writeclient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async({id }:{id :string}) => {

    const {views: totalviews}= await client.withConfig({useCdn: false}).fetch(VIEWS_BY_ID,{id})
    
   after( async()=>{await writeclient.patch(id).set({views: totalviews+1}).commit();})

    return (

    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping/>
        </div>
        <p className='view-text'>
            <span className='font-black'>Views: {totalviews}</span>

        </p>
    </div>
  )
}

export default View