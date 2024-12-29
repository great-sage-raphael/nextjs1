import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import { promises } from "dns";

export default async function Home( {searchParams}:{
  searchParams: Promise< {query?:string}>
}) 
{
  const Query =(await searchParams).query;
  return (
    <>
    <section className="pink_container">
    <h1 className="heading">pitch your startup <br></br> connect with others</h1>
    <p className="sub-heading !max-w-3xl"> Submit Your Ideas ,Vote On Pitches and Get Noticed</p>

    <SearchForm query={Query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {Query ? `search results for " ${Query} "`:'all startups'}
      </p>
      <ul className="card_grid">

      </ul>

    </section>
    
    </>
  );
}
