import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB } from "./sanity/lib/queries"
import { writeclient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user,profile}:{user:any;profile:any}) 
      {

      const existingUser= await client
      .withConfig({useCdn: false})
      .fetch(AUTHOR_BY_GITHUB,{id :profile?.id,})
      if(!existingUser)
      {
        await writeclient.create({
          _type: 'author',
          id: profile.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio ||"",
        })
      }
      return true;
    },
    async jwt({ token  ,account ,profile }:{token:any;account:any;profile:any}){
      if(account && profile){
        const user =await client
        .withConfig({useCdn: false})
        .fetch(AUTHOR_BY_GITHUB, {id: profile?.id});
        if(user){
          token.id=user._id;
        }    
        
      }
          return token;
    },
    async session({ session, token }:{session:any;token:any}) {
      if(token.id){
        session.id=token.id;
      }
      return session;
    },
},

});
