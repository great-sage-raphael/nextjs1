import { formatdate } from "@/lib/utils"
import { EyeIcon} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup,"author"> &{author?: Author};

const StartupCard = ({posts}:{posts: StartupTypeCard}) => {
  const {_createdAt,views,_id,image,category,author,title,description}=posts
  return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className="startup-card_date">
              {formatdate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                 <EyeIcon className="size-6 text-primary"/>
                  <span className="text-16-medium"> {views}</span>
            </div>
        </div>
        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}}`}>
                  <p className="text-16-medium line-clamp-1">{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                  <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}}`}>
              <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full"></Image>
            </Link>
          </div>

          <Link href={`/startup/${_id}`}>
               <p className="startup-card_desc"> {description}</p>
               <img src={`${image}`} alt="image" className="startup-card_img"></img>
          </Link>

          
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                  <p className="text-16-medium">{category}</p>
                </Link>
                <button className="startup-card_btn">
                  <Link href={`/startup/${_id}`}>
                    Details
                  </Link>
                </button>
            </div>
        

        
        
    </li>
  )
}

export default StartupCard