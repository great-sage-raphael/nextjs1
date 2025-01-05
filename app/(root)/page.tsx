import SearchForm from "../../components/SearchForm";
import { promises } from "dns";
import StartupCard,{StartupTypeCard} from "@/components/StartupCard"
import { client } from "@/sanity/lib/client";
import { Startup_query } from "@/sanity/lib/queries";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home( {searchParams}:{
  searchParams: Promise< {query?:string}>
}) 
{
  const Query =(await searchParams).query;
  const params={search:Query || null}
  //normal fetching with no livetime update wihtout reloading
  //const posts=await client.fetch(Startup_query);
  //live time update fetcing with no reloading

  const session= await auth()

  console.log(session?.id)

  const {data : posts}=await sanityFetch({ query:Startup_query,params})
  console.log(JSON.stringify(posts))
 
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
        {posts?.length >0? (
          
          posts.map(( post: StartupTypeCard)=>(
          <StartupCard key={post?._id} posts={post}/>
        ))
        ):(
          <p className="no-results"> No startups found</p>
        )}
        
      </ul>

    </section>
    <SanityLive/>
    </>
  );
}
