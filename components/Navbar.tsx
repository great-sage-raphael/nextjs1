import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth ,signOut,signIn} from '@/auth'
import { redirect } from 'next/dist/server/api-utils'

const  Navbar = async()=> {
    const session =await auth();
  return (
    <header  className='px-5 py-3 bg-slate-300 shadow-sm font-work-sans'>
        <nav className='justify-between flex items-center'>
            <Link href="/">
                < Image src="/logo.png" alt="logo" width={144} height={30}/>
            </Link>
            <div className='flex items-center gap-5 text-black'>
            {session && session ?.user?(
                <>
                <Link href="/startup/create">
                    <span>create</span>
                </Link>
                <form action={async()=>
                    {"use server";
                        await signOut({redirectTo:'/'})}}> 
                        <button type='submit'> <span> signOut</span></button>
                </form>
                <Link href={`/users/${session?.id}`}>
                    <span>{session?.user?.name}</span>
                </Link>
                </>
            ):(
                <form action ={
                   
                    async()=>{
                    'use server';
                    await signIn('github')
                    }}>
                    <button type='submit'>login</button>
                </form>
            )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar