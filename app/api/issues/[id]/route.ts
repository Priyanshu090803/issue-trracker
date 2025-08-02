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


export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const findIssue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!findIssue){
        return NextResponse.json({error:"Invalid Issue!"},{status:404})
    }
    const deleteIssue = await prisma.issue.delete({
        where:{id:findIssue.id}
    })
    return NextResponse.json("Issue Deleted Successfully!",{status:200})
}