import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import {Search} from 'lucide-react'
import { LucideAArrowDown } from 'lucide-react'
function SearchForm({query}:{query?:string}) {
    
    
  return (
    <Form action="/" scroll={false} className='search-form'>

        <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='search startups'
        >
        
        </input>
        <div className='flex gap-2'>
            {query && (<SearchFormReset/>)}
            <button type='submit' className='search-btn text-white'><Search className='size-5' /></button>

        </div>
    </Form>
  )
}

export default SearchForm