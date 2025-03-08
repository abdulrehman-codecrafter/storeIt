import { Webhook } from 'svix';
import { headers } from 'next/headers';
import User from '../../../../models/user-model';
import dbConnect from '../../../../lib/mongodb';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Await the headers() function to get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the raw body
  const payload = await req.text(); // Use text() to get the raw body

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    console.log(
      'clerk',
      id,
      email_addresses,
      first_name,
      last_name,
      image_url
    );
    if (!id || !email_addresses) {
      return new Response('Error occurred -- missing data', {
        status: 400,
      });
    }

    await dbConnect(); // Ensure this function manages connections efficiently

    const user = {
      _id: id,
      email: email_addresses[0].email_address,
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    const newUser = new User(user);
    console.log(newUser);
    await newUser.save();
  }

  return new Response('', { status: 200 });
}
