'use client';
import Link from "next/link";
function SearchFormReset() {
    const reset=()=>{
        const form=document.querySelector('.search-form') as HTMLFormElement;
        if(form) form.reset();
    }
  return (

    <button type='reset' onClick={reset}>
        <Link href='/' className="search-btn text-white">
            x
        </Link>
    </button>
    )
}

export default SearchFormReset