import React from 'react'
import { auth } from '@clerk/nextjs/server'

export default async function Media() {
    const { userId, redirectToSignIn } = await auth()
    console.log(userId)
  return (
    <div>Media</div>
  )
}

