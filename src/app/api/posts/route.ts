import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  const { caption, media_url, media_type, platforms } = await request.json();

  // Get the auth token from the request headers
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }
  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Data to save to Firestore
    const postData = {
      user_id: uid,
      caption,
      media_url,
      media_type,
      platforms_to_post: platforms,
      created_at: FieldValue.serverTimestamp(), // Use server timestamp
    };

    // Add a new document with a generated ID to the "posts" collection
    await adminDb.collection('posts').add(postData);

    // --- FUTURE LOGIC ---
    // This is where you would trigger the actual posting to social media platforms.
    
    return NextResponse.json({ success: true, message: "Post created successfully." });

  } catch (error) {
    console.error("Firebase post error:", error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}