import { Webhook } from 'svix'
import { headers } from 'next/headers'
import dbConnect from "@/lib/mongodb"
import User from "@/models/user-model"


export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    
  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!id || !email_addresses) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }



    try {
        await dbConnect();
      
        const userData = {
          clerkId: id,
          email: email_addresses[0].email_address,
          ...(first_name ? { firstName: first_name } : {}),
          ...(last_name ? { lastName: last_name } : {}),
          ...(image_url ? { imageUrl: image_url } : {})
        };
        
        console.log(userData)

        const newUser = await User.findOneAndUpdate(
          { clerkId: id }, // Check by Clerk ID
          userData,
          { new: true, upsert: true, setDefaultsOnInsert: true } // Upsert ensures user is created if not found
        );
      
        console.log("User created/updated:", newUser);
      } catch (err) {
        console.error("Error creating/updating user:", err);
        return new Response(
          JSON.stringify({ error: err.message, message: "Error creating db" }),
          { status: 500 }
        );
      }
      


  }

  return new Response('Created successfully', { status: 200 })
}