import { defineField, defineType } from "sanity";

import { UserIcon } from "lucide-react";

export const startup =defineType({
    name: "startup",
    title :'Startup',
    type :"document",
    icon :UserIcon,
    fields:[
        defineField( {
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" },
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (rule)=>rule.min(1).max(20).required().error("enter the category") 
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (rule)=>rule.required()
        }),
        defineField({
            name: "pitch",
            type: "markdown",
        }),
    ],
  


})