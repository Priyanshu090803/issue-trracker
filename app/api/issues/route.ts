import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "./validationSchema";
 

export async function POST (request:NextRequest){
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400}) // bad request!
    }
    const newIssue = await prisma.issue.create({
        data:{
            title:body.title,
            description:body.description
        }
    })
    if(!newIssue){
        return NextResponse.json("Failed to create new issue!",{status:500})
    }
    return NextResponse.json(newIssue,{status:200})
} 