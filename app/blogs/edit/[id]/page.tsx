"use client";

import { useEffect, useRef, FormEvent, useState } from "react";
import { fetchBlog, updateBlog } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function editBlog({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [blog, setBlog] = useState({ title: "", content: "" });
  const { id } = params;

  useEffect(() => {
    async function fetchingBlog() {
      const blogData = await fetchBlog(id);
      if (blogData) setBlog(blogData);
    }

    fetchingBlog();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      toast({
        title: "Blog edited successfully !",
        description: "redirecting to blogs....",
      });

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        await updateBlog(id as string, formData);
        formRef.current.reset();
        setTimeout(() => {
          router.push("/blogs");
          router.refresh();
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error editing blog",
        description: "please try again",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center mt-16">Edit Blog</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col mt-5 py-5 gap-5 border-2 border-black rounded-md w-1/2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="text-black border-black border-2 rounded-md w-1/2 mx-auto mt-5 p-2"
          defaultValue={blog.title}
        />
        <textarea
          rows={10}
          name="content"
          required
          placeholder="Content"
          className="text-black border-black border-2 rounded-md w-2/3 mx-auto p-2"
          defaultValue={blog.content}
        />
        <button type="submit" className="bg-black text-white w-1/2 mx-auto p-2">
          Submit
        </button>
      </form>
    </div>
  );
}
