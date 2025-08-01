import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../validationSchema";

export async function PATCH(
    request:NextRequest,
    {params}:{params:{id:string}}
){ 
    const body= await request.json()
    const validation= issueSchema.safeParse(body)
    if(validation.error){
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue){
        return NextResponse.json({error:"Invalid issue!"},{status:404})
    }
    const EditIssue = await prisma.issue.update({
        where:{id:issue.id},
        data:{
            title:body.title,
            description:body.description
        }
    })
    if(!EditIssue){
        return NextResponse.json({error:"Failed to edit issue"},{status:500})
    }
    return NextResponse.json(EditIssue)
}