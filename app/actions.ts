"use server"

import prisma from "@/lib/db";


export async function fetchBlog(id:string)
{
    return await prisma.blog.findUnique({
        where: {id},
    });
}


export async function createBlog(formdata : FormData)
{   
    await prisma.blog.create({
        data: {
            title: formdata.get("title") as string,
            content: formdata.get("content") as string
        }
    });
    
}


export async function updateBlog(id:string, formdata:FormData)
{
    await prisma.blog.update({
        where: {id},
        data: {
            title: formdata.get("title") as string,
            content: formdata.get("content") as string
        }
    });
}

export async function deleteBlog(id:string)
{
    await prisma.blog.delete({
        where: {id}
    });
}