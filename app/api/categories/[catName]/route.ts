import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params: {catName: string}}
){
    try {
        const catName = params.catName;
    //console.log("id:", id);
    const posts = await prisma.category.findUnique({where: {catName},
        include: {posts: {include: {author: true}, orderBy:{
            createdAt: "desc",
        }}},
        
    });
    return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({message: "could not fetch posts"}) ;
    }
}