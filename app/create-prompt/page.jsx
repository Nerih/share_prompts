'use client';
import React from 'react'
import { useState } from 'react' 
import { useSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'

const CreatePrompt = () => {
  const router = useRouter(); //setup router
  const { data: session } = useSession(); //setup session

  const [submitting, setSubmitting] = useState(false); //setup hook for submitting
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault(); //prevent reload
    setSubmitting(true); //set submitting to true, i.e. loader
    try {
      console.log('UserIn')
      console.log(session?.user)
      const response= await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userID: session?.user.id,
          tag: post.tag
        })
      })
      console.log('done submitting')
      console.log(response)
      if (response.ok){
        console.log('OK Response push/')
          router.push('/');
      }

    } catch(error)
    {
        console.log(error);
    } finally {
      console.log('Finally')
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt